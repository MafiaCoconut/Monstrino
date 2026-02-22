---
id: name-formatter
title: Name Formattern
tags: [monstrino, service, formatter]
created: 27.11.2025
---
A stateless domain service that normalizes raw entity names into a canonical,
machine-stable format used across Monstrino.

:::info Purpose
Normalize arbitrary input (from parsers, scrapers, providers) to a predictable
and comparable canonical form.
:::

---

## Features

- Lowercases all characters  
- Removes diacritics (NFKD normalization)  
- Converts to ASCII  
- Replaces non-alphanumeric sequences with a single hyphen  
- Collapses consecutive hyphens  
- Trims leading/trailing separators  
- Produces stable slugs for domain entities  

---

## Public Interface

```python
class TitleFormatter:
    @staticmethod
    def format_name(name: str) -> str:
        ...
```

---

## Behaviour (Step-by-Step)

### 1. Lowercase  
Input like !Draculaura! becomes !draculaura!.

### 2. Unicode normalization (NFKD)  
Accented characters are decomposed into base + marks.

### 3. ASCII conversion (strip accents)  
!Élissabat! → !Elissabat!

### 4. Replace non-alphanumerics with hyphens  
!"lagoona blue (2024)"! → !lagoona-blue-2024!

### 5. Strip leading/trailing hyphens  
!"--abbey-bominable-"! → !abbey-bominable!

### 6. Collapse multiple hyphens  
!"catty--noir---2013"! → !catty-noir-2013!

---

## Full Implementation

```python
import re
import unicodedata

class TitleFormatter:
    @staticmethod
    def format_name(name: str) -> str:
        value = name.lower()
        value = unicodedata.normalize('NFKD', value)
        value = value.encode('ascii', 'ignore').decode('ascii')
        value = re.sub(r'[^a-z0-9]+', '-', value)
        value = value.strip('-')
        value = re.sub(r'-{2,}', '-', value)
        return value
```

---

## Examples

```python
TitleFormatter.to_code("Draculaura")
# "draculaura"

TitleFormatter.to_code("Élissabat (Reissue 2024)")
# "elissabat-reissue-2024"

TitleFormatter.to_code(" Lagoona   Blue  !! ")
# "lagoona-blue"

TitleFormatter.to_code("💖Cleo de Nile💖")
# "cleo-de-nile"
```

---

## When to Use

- Before creating Release / Series / Character  
- In acquisition flows (catalog-collector, importer)  
- Before deduplication  
- For canonical slugs  
- For indexing and search  

:::tip
Use TitleFormatter in **every ingestion pipeline** before persisting data.
:::

---

## Contract

- **Pure** (no I/O, no DB)  
- **Deterministic**  
- **Idempotent**  
- **ASCII-only**