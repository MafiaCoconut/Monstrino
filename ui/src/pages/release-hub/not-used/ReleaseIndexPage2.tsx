
import * as React from "react";
import {
  AlertTriangle,
  Bookmark,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  Info,
  Menu,
  Minus,
  Package,
  Search,
  Share2,
  Shield,
  Star,
  Tag,
  TrendingDown,
  TrendingUp,
  ZoomIn,
  Box,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";


const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

interface SpecCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SpecCard = ({ title, icon, children, className = "" }: SpecCardProps) => {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-card ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
};

interface SpecRowProps {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
}

export const SpecRow = ({ label, value, highlight = false }: SpecRowProps) => (
  <div className="flex items-start justify-between py-2.5 border-b border-border/50 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm font-medium text-right ${highlight ? "text-primary" : ""}`}>
      {value}
    </span>
  </div>
);

interface ReleaseHeroProps {
  title: string;
  subtitle: string;
  releaseDate: string;
  series: string;
  edition: string;
  rarity: string;
  rating: number;
}

const ReleaseHero = ({
  title,
  subtitle,
  releaseDate,
  series,
  edition,
  rarity,
  rating,
}: ReleaseHeroProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Releases</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground transition-colors">{series}</a>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Title & Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                {rarity}
              </Badge>
              <Badge variant="outline" className="border-accent/50 text-accent bg-accent/10">
                {edition}
              </Badge>
            </div>
            
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                {series}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="mt-2 text-xl text-muted-foreground">{subtitle}</p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MetaItem icon={Calendar} label="Released" value={releaseDate} />
              <MetaItem icon={Tag} label="SKU" value="MH-2024-CFD-001" />
              <MetaItem icon={Package} label="Stock" value="Limited" />
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground text-sm">(2.4k reviews)</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:flex-col lg:items-end">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Heart className="h-4 w-4" />
              Add to Collection
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetaItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon className="h-4 w-4 text-muted-foreground" />
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);


// Mock data
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80", alt: "Main product view" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Side view" },
  { src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80", alt: "Accessories detail" },
  { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80", alt: "Box packaging" },
  { src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80", alt: "Complete set" },
];

const accessories = [
  { id: "1", name: "Coffin Purse", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", category: "Bag", rarity: "Rare" },
  { id: "2", name: "Skull Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80", category: "Jewelry" },
  { id: "3", name: "Spider Web Choker", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&q=80", category: "Jewelry", rarity: "Exclusive" },
  { id: "4", name: "Bat Wings Headband", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300&q=80", category: "Hair" },
];

const clothing = [
  { id: "1", name: "Gothic Lace Dress", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80", category: "Dress", rarity: "Signature" },
  { id: "2", name: "Platform Boots", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80", category: "Footwear" },
  { id: "3", name: "Fishnet Stockings", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=300&q=80", category: "Legwear" },
];

const pets = [
  { id: "1", name: "Count Fabulous", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&q=80", category: "Bat", rarity: "Legendary" },
];

const priceHistory = [
  { date: "Jan", price: 85 },
  { date: "Feb", price: 92 },
  { date: "Mar", price: 88 },
  { date: "Apr", price: 105 },
  { date: "May", price: 115 },
  { date: "Jun", price: 125 },
  { date: "Jul", price: 118 },
  { date: "Aug", price: 135 },
];

const marketOffers = [
  { id: "1", seller: "MonsterCollector_99", price: 145, condition: "New" as const, platform: "eBay", verified: true, shipping: "Free shipping", lastUpdated: "2h ago" },
  { id: "2", seller: "DollHaven", price: 128, condition: "Like New" as const, platform: "Mercari", verified: true, shipping: "$8.99", lastUpdated: "4h ago" },
  { id: "3", seller: "VintageGhouls", price: 115, condition: "Good" as const, platform: "Facebook", verified: false, lastUpdated: "1d ago" },
  { id: "4", seller: "SpookyTrades", price: 98, condition: "Fair" as const, platform: "eBay", verified: true, shipping: "$12.00", lastUpdated: "2d ago" },
];

const ReleaseContent = () => {
  return (
    <section className="py-8 border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <ImageGallery images={galleryImages} />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Draculaura, the 1,600-year-old vampire daughter of Dracula, arrives in this 
                stunning Collector's First Day edition. Featuring her signature pink and black 
                aesthetic with intricate gothic detailing, this release marks the beginning of 
                a new era for Monster High collectors.
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <SpecCard title="General Information" icon={<Info className="h-5 w-5" />}>
                <SpecRow label="Series" value="Collector's First Day" />
                <SpecRow label="Wave" value="Wave 1" />
                <SpecRow label="Year" value="2024" />
                <SpecRow label="Age Group" value="15+" />
                <SpecRow label="Brand" value="Monster High" />
              </SpecCard>

              <SpecCard title="Product Details" icon={<Package className="h-5 w-5" />}>
                <SpecRow label="Height" value='10.5"' />
                <SpecRow label="Articulation" value="22 Points" highlight />
                <SpecRow label="Material" value="ABS Plastic, Fabric" />
                <SpecRow label="Edition Size" value="5,000 Units" highlight />
                <SpecRow label="Certification" value="COA Included" />
              </SpecCard>
            </div>

            {/* Physical Contents */}
            <SpecCard title="Physical Contents" icon={<Box className="h-5 w-5" />}>
              <div className="grid grid-cols-2 gap-x-4">
                <SpecRow label="Doll" value="1x Draculaura" />
                <SpecRow label="Stand" value="1x Display Stand" />
                <SpecRow label="Certificate" value="1x COA Card" />
                <SpecRow label="Booklet" value="1x Collector's Guide" />
                <SpecRow label="Accessories" value="4 items" />
                <SpecRow label="Clothing" value="3 items" />
              </div>
            </SpecCard>

            {/* Collections */}
            <div className="space-y-6 pt-4">
              <CollectionGrid
                title="Accessories"
                items={accessories}
                columns={4}
              />
              <CollectionGrid
                title="Clothing"
                items={clothing}
                columns={3}
              />
              <CollectionGrid
                title="Pets"
                items={pets}
                columns={2}
              />
            </div>

            {/* Price & Market */}
            <div className="grid lg:grid-cols-2 gap-6 pt-4">
              <PriceHistory data={priceHistory} currentPrice={135} />
              <MarketOffers offers={marketOffers} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


interface PriceDataPoint {
  date: string;
  price: number;
}

interface PriceHistoryProps {
  data: PriceDataPoint[];
  currentPrice: number;
  currency?: string;
}

const PriceHistory = ({ data, currentPrice, currency = "USD" }: PriceHistoryProps) => {
  const firstPrice = data[0]?.price || currentPrice;
  const priceChange = currentPrice - firstPrice;
  const percentChange = ((priceChange / firstPrice) * 100).toFixed(1);
  const isUp = priceChange > 0;
  const isDown = priceChange < 0;

  const formatPrice = (value: number) => 
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Current Market Price</p>
          <p className="font-display text-3xl font-bold">{formatPrice(currentPrice)}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
          isUp 
            ? "bg-success/10 text-success" 
            : isDown 
              ? "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground"
        }`}>
          {isUp ? (
            <TrendingUp className="h-4 w-4" />
          ) : isDown ? (
            <TrendingDown className="h-4 w-4" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
          <span>{isUp ? "+" : ""}{percentChange}%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(330 85% 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(330 85% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(240 5% 55%)" }}
              dy={10}
            />
            <YAxis
              domain={["dataMin - 10", "dataMax + 10"]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(240 5% 55%)" }}
              tickFormatter={(value) => `$${value}`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240 8% 12%)",
                border: "1px solid hsl(240 6% 20%)",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "hsl(240 5% 65%)", fontSize: 12 }}
              itemStyle={{ color: "hsl(45 20% 95%)", fontSize: 14, fontWeight: 500 }}
              formatter={(value: number) => [formatPrice(value), "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(330 85% 60%)"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <StatItem label="30d Low" value={formatPrice(Math.min(...data.map(d => d.price)))} />
        <StatItem label="30d High" value={formatPrice(Math.max(...data.map(d => d.price)))} />
        <StatItem label="Avg" value={formatPrice(data.reduce((a, b) => a + b.price, 0) / data.length)} />
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);


interface MarketOffer {
  id: string;
  seller: string;
  price: number;
  condition: "New" | "Like New" | "Good" | "Fair";
  platform: string;
  verified: boolean;
  shipping?: string;
  lastUpdated: string;
}

interface MarketOffersProps {
  offers: MarketOffer[];
  currency?: string;
}

const MarketOffers = ({ offers, currency = "USD" }: MarketOffersProps) => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(value);

  const getConditionColor = (condition: MarketOffer["condition"]) => {
    switch (condition) {
      case "New":
        return "text-success border-success/50 bg-success/10";
      case "Like New":
        return "text-accent border-accent/50 bg-accent/10";
      case "Good":
        return "text-gold border-gold/50 bg-gold/10";
      case "Fair":
        return "text-warning border-warning/50 bg-warning/10";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Market Offers</h3>
          <Badge variant="outline" className="text-muted-foreground">
            {offers.length} active
          </Badge>
        </div>
      </div>

      <div className="divide-y divide-border">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-4 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium truncate">{offer.seller}</span>
                  {offer.verified ? (
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Badge
                    variant="outline"
                    className={getConditionColor(offer.condition)}
                  >
                    {offer.condition}
                  </Badge>
                  <span className="text-muted-foreground">{offer.platform}</span>
                  {offer.shipping && (
                    <span className="text-muted-foreground">
                      • {offer.shipping}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-display text-xl font-bold text-primary">
                  {formatPrice(offer.price)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Updated {offer.lastUpdated}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>{offer.verified ? "Verified Seller" : "Unverified"}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                View Listing
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-secondary/30 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Prices aggregated from multiple platforms. Last sync: 5 minutes ago.
        </p>
      </div>
    </div>
  );
};


interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group aspect-[4/5] overflow-hidden rounded-xl bg-secondary border border-border">
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Navigation Arrows */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        {/* Image Counter */}
        <div className="absolute left-3 bottom-3 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur text-xs font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative flex-shrink-0 h-20 w-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === activeIndex
                ? "border-primary shadow-glow"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};


interface CollectionItem {
  id: string;
  name: string;
  image: string;
  category: string;
  rarity?: string;
}

interface CollectionGridProps {
  title: string;
  items: CollectionItem[];
  columns?: 2 | 3 | 4;
}

const CollectionGrid = ({ title, items, columns = 4 }: CollectionGridProps) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{items.length} items</span>
      </div>
      
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {items.map((item) => (
          <CollectionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const CollectionCard = ({ item }: { item: CollectionItem }) => (
  <div className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-card cursor-pointer">
    <div className="aspect-square bg-secondary overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="p-3">
      <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
      <p className="text-sm font-medium truncate">{item.name}</p>
      {item.rarity && (
        <Badge variant="outline" className="mt-2 text-xs border-gold/50 text-gold">
          {item.rarity}
        </Badge>
      )}
    </div>
  </div>
);


const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">Monstrino</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem label="Releases" active />
          <NavItem label="Community" />
          <NavItem label="Marketplace" />
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative animate-fade-in-up">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search releases..."
                className="w-[200px] md:w-[280px] pl-9 bg-secondary border-border focus-visible:ring-primary"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label, active = false }: { label: string; active?: boolean }) => (
  <button
    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md ${
      active
        ? "text-foreground bg-secondary"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
    }`}
  >
    {label}
    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
  </button>
);



const ReleasePageIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ReleaseHero
          title="Draculaura"
          subtitle="Collector's First Day Edition"
          releaseDate="October 2024"
          series="Monster High Collector"
          edition="First Edition"
          rarity="Ultra Rare"
          rating={4.8}
        />
        <ReleaseContent />
      </main>
    </div>
  );
};

export default ReleasePageIndex;
