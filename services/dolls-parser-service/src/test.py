#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MHCollector Full Scraper
------------------------
Scrapes https://mhcollector.com/category/release-dates/{year}/ for years 2010..2025
and extracts "Indexed Information" from each item page.

Outputs per year:
- items_ghouls_and_pets_{year}.json
- items_other_{year}.json
- periodic batches: batches/items_ghouls_and_pets_{year}_batch_{n}.json (every 10 items)
- periodic batches: batches/items_other_{year}_batch_{n}.json
At the end of each year, batches are merged into the final files.

Also maintains entities (with stable autoincrement IDs):
- /entities/series.json
- /entities/characters.json
- /entities/firms.json
- /entities/multipacks.json
- /entities/animals.json
- /entities/types.json

Usage:
  python mhcollector_full_scraper.py --out ./mh_out --years 2010-2025
  python mhcollector_full_scraper.py --out ./mh_out --years 2014,2015,2016

Requirements:
  pip install requests beautifulsoup4 lxml python-slugify tqdm
"""
import re, json, os, sys, time, argparse, itertools, math
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from slugify import slugify
from tqdm import tqdm

BASE = "https://mhcollector.com"
HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) MonstrinoBot/1.0 (+contact user)"}

def normspace(s): return re.sub(r'\s+', ' ', s or '').strip()

def get(url):
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r

def ensure_dir(p):
    os.makedirs(p, exist_ok=True)

def read_json(path, default):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return default

def write_json(path, data):
    ensure_dir(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def append_and_checkpoint(acc, item, year_dir, kind, counter):
    acc.append(item)
    if counter % 10 == 0:
        batch_idx = counter // 10
        batch_path = os.path.join(year_dir, "batches", f"{kind}_{batch_idx:03d}.json")
        write_json(batch_path, acc)

def merge_batches(year_dir, kind, final_path):
    batches_dir = os.path.join(year_dir, "batches")
    if not os.path.isdir(batches_dir):
        # nothing to merge
        return
    parts = []
    for name in sorted(os.listdir(batches_dir)):
        if name.startswith(kind+"_") and name.endswith(".json"):
            parts += read_json(os.path.join(batches_dir, name), [])
    # de-duplicate by (modelNumber, link, character)
    seen = set(); out = []
    for it in parts:
        key = (it.get("modelNumber",""), it.get("link",""), it.get("character",{}).get("title",""))
        if key in seen:
            continue
        seen.add(key); out.append(it)
    write_json(final_path, out)

class Registry:
    def __init__(self, path, key):
        self.path = path
        self.key = key  # "title" or "name"
        self.items = read_json(path, [])
        self.index = { (it.get("name") or it.get("title","")).lower(): it["id"] for it in self.items }
        self.next_id = max([it["id"] for it in self.items], default=0) + 1
    def get(self, title, link=""):
        k = (title or "").lower()
        if k in self.index:
            return self.index[k]
        obj = {"id": self.next_id, self.key: title, "description": "", "link": link}
        if self.key == "name":
            obj = {"id": self.next_id, "name": title, "description": "", "alt_names": "", "link": link}
        self.items.append(obj)
        self.index[k] = self.next_id
        self.next_id += 1
        return self.index[k]
    def get_with_count(self, title, link="", count=0):
        # for multipacks: add count_of_characters
        k = (title or "").lower()
        if k in self.index:
            return self.index[k]
        obj = {"id": self.next_id, "title": title, "description": "", "link": link, "count_of_characters": int(count)}
        self.items.append(obj)
        self.index[k] = self.next_id
        self.next_id += 1
        return self.index[k]
    def save(self):
        write_json(self.path, self.items)

def char_link(name, group="ghouls"):
    slug = slugify(normspace(name))
    return f"{BASE}/category/characters/{group}/{slug}/"

def pet_link(name):
    slug = slugify(normspace(name))
    return f"{BASE}/category/characters/pets/{slug}/"

def parse_years_spec(spec):
    years = set()
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            a,b = part.split("-",1)
            for y in range(int(a), int(b)+1):
                years.add(y)
        else:
            years.add(int(part))
    return sorted(years)

def collect_item_links(year):
    url = f"{BASE}/category/release-dates/{year}/"
    html = get(url).text
    soup = BeautifulSoup(html, "lxml")
    links = []
    # typical post links in a category listing
    for a in soup.select("h2.entry-title a, h3.entry-title a, article a.entry-title-link"):
        href = a.get("href")
        if href and "/category/" not in href:
            links.append(href)
    # fallback: all links that look like product pages
    if not links:
        for a in soup.select("a"):
            href = a.get("href","")
            if href.startswith(BASE) and "/category/" not in href and "/tag/" not in href:
                if re.search(r"/(monster|ghoul|boo|fright|haunt|class|vinyl|skullector|fusion|shake|exchange|scream|scaris|wishes|dead-tired|picture|power|pack|playset|shriek|electrified|family|party|ghouls-night-out|ghoul-spirit)/", href):
                    links.append(href)
    # unique, keep order
    seen=set(); out=[]
    for u in links:
        if u not in seen:
            seen.add(u); out.append(u)
    return out

def extract_indexed_info(page_url, soup):
    # find "Indexed Information" block; parse as key -> value(s)
    h = soup.find(lambda tag: tag.name in ("h2","h3") and "Indexed Information" in tag.get_text(strip=True))
    info = {}
    container = None
    if h:
        # likely the following sibling contains dl or table
        container = h.find_next(["div","section","table","dl"])
    if not container:
        container = soup

    # try definition list
    for dl in container.find_all("dl"):
        terms = dl.find_all(["dt","th"])
        defs = dl.find_all(["dd","td"])
        if len(terms) == len(defs):
            for dt, dd in zip(terms, defs):
                k = normspace(dt.get_text(" ", strip=True)).rstrip(":")
                v = normspace(dd.get_text(" ", strip=True))
                info[k] = v
    # try table rows
    for tr in container.find_all("tr"):
        th = tr.find(["th","td"])
        td = th.find_next("td") if th else None
        if th and td:
            k = normspace(th.get_text(" ", strip=True)).rstrip(":")
            v = normspace(td.get_text(" ", strip=True))
            if k and v:
                info[k] = v

    # Try to locate gallery images
    images = []
    # common WP gallery selector patterns
    for img in soup.select(".gallery img, figure img, .wp-block-gallery img, .blocks-gallery-item img, .entry-content img"):
        src = img.get("data-src") or img.get("src")
        if src and not src.endswith("blank.gif"):
            images.append(src)
    images = [u for i,u in enumerate(images) if u and u not in images[:i]]

    return info, images

def split_multipack_characters(char_field):
    # e.g., "Draculaura & Clawd Wolf", "Cleo de Nile, Ghoulia Yelps and Abbey Bominable"
    if not char_field:
        return []
    txt = char_field.replace(" and ", ", ").replace("&", ",").replace("+", ",")
    parts = [normspace(p) for p in txt.split(",") if normspace(p)]
    # normalize quotes
    parts = [re.sub(r'[“”"]', "", p) for p in parts]
    return parts if len(parts) > 1 else parts

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True, help="Output folder")
    ap.add_argument("--years", required=True, help="Comma list or range, e.g., 2010-2025 or 2014,2015,2016")
    args = ap.parse_args()

    out_root = args.out
    ensure_dir(out_root)
    ent_dir = os.path.join(out_root, "entities"); ensure_dir(ent_dir)

    # registries
    series_reg  = Registry(os.path.join(ent_dir, "series.json"), "title")
    chars_reg   = Registry(os.path.join(ent_dir, "characters.json"), "name")
    firms_reg   = Registry(os.path.join(ent_dir, "firms.json"), "title")
    packs_reg   = Registry(os.path.join(ent_dir, "multipacks.json"), "title")
    pets_reg    = Registry(os.path.join(ent_dir, "animals.json"), "title")
    types_reg   = Registry(os.path.join(ent_dir, "types.json"), "title")

    # Pre-create some type entries to keep consistency
    for t in ["Doll","Playset","Multi-Pack","Vinyl","Mini Figure"]:
        types_reg.get(t, link="")

    years = parse_years_spec(args.years)

    for year in years:
        year_dir = os.path.join(out_root, str(year)); ensure_dir(year_dir); ensure_dir(os.path.join(year_dir,"batches"))
        items_main, items_other = [], []
        counter_main = counter_other = 0

        links = collect_item_links(year)

        for link in tqdm(links, desc=f"Year {year} items"):
            try:
                html = get(link).text
            except Exception as e:
                print("WARN: fetch failed", link, e)
                continue
            soup = BeautifulSoup(html, "lxml")
            info, images = extract_indexed_info(link, soup)

            # Map fields
            character = info.get("Character","")
            series = info.get("Series","")
            gender = info.get("Gender","")
            released = info.get("Released", str(year))
            released_year = int(re.findall(r"\d{4}", released)[0]) if re.findall(r"\d{4}", released) else year
            model = info.get("Model Number","")
            type_title = info.get("Type","Doll") or "Doll"

            # Entities
            series_id = series_reg.get(series, link="")
            if gender.lower().startswith("manster"):
                group = "mansters"
            else:
                group = "ghouls"
            # Character(s)
            char_list = split_multipack_characters(character) or [character]

            # Exclusive Of
            exclusive_title = info.get("Exclusive of","") or info.get("Exclusive Of","") or ""
            exclusive_obj = {"id":0,"title":"","link":""}
            if exclusive_title:
                ex_id = firms_reg.get(exclusive_title, link="")
                exclusive_obj = {"id": ex_id, "title": exclusive_title, "link": ""}

            # Pet
            pet_title = info.get("Pet","") or info.get("Pets","")
            pet_id = -1
            if pet_title:
                pet_id = pets_reg.get(pet_title, link=pet_link(pet_title))

            # Type entity
            type_id = types_reg.get(type_title, link="")

            # Multipack detection
            multi_ref = None
            if len(char_list) > 1:
                title_pack = f"{os.path.basename(urlparse(link).path).replace('-',' ').title()}"
                # Better: use page <h1> if available
                h1 = soup.find("h1")
                if h1: title_pack = normspace(h1.get_text(" ", strip=True))
                mp_id = packs_reg.get_with_count(title_pack, link=link, count=len(char_list))
                multi_ref = {"id": mp_id, "title": title_pack, "link": link}

            # Build items
            for i, name in enumerate(char_list):
                if not name:
                    continue
                is_ghoul = (group=="ghouls")
                char_id = chars_reg.get(name, link=char_link(name, "ghouls" if is_ghoul else "mansters"))
                item = {
                    "modelNumber": model,
                    "type": {"id": type_id, "title": type_title, "link": ""},
                    "character": {"id": char_id, "title": name, "link": char_link(name, "ghouls" if is_ghoul else "mansters")},
                    "series": {"id": series_id, "title": series, "link": ""},
                    "gender": {"title": "Ghoul" if is_ghoul else "Manster", "link": f"{BASE}/category/characters/{'ghouls' if is_ghoul else 'mansters'}/"},
                    "released": released_year,
                    "link": link,
                    "images": images if images else [],
                    "description": "",
                    "exclusive_of": exclusive_obj,
                    "pet_id": pet_id
                }
                if multi_ref:
                    item["multi-pack"] = multi_ref

                if is_ghoul or pet_title:
                    items_main.append(item); counter_main += 1
                    append_and_checkpoint(items_main, item, year_dir, f"items_ghouls_and_pets_{year}", counter_main)
                else:
                    items_other.append(item); counter_other += 1
                    append_and_checkpoint(items_other, item, year_dir, f"items_other_{year}", counter_other)

        # Merge batches at year end
        final_main = os.path.join(year_dir, f"items_ghouls_and_pets_{year}.json")
        final_other = os.path.join(year_dir, f"items_other_{year}.json")
        merge_batches(year_dir, f"items_ghouls_and_pets_{year}", final_main)
        merge_batches(year_dir, f"items_other_{year}", final_other)

        print(f"[Year {year}] Done. Main: {len(read_json(final_main, []))} items; Other: {len(read_json(final_other, []))} items.")

    # Save registries
    series_reg.save(); chars_reg.save(); firms_reg.save(); packs_reg.save(); pets_reg.save(); types_reg.save()
    print("Entities saved in", ent_dir)

if __name__ == "__main__":
    main()