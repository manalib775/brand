
import { Star, TrendingUp } from "lucide-react";
import { BrandCard } from "@/components/BrandCard";

interface Brand {
  name: string;
  logo: string;
  rating: number;
  phone: string;
  email: string;
  subsidiaries?: Array<{
    name: string;
    products?: Array<{ name: string }>;
  }>;
}

const trendingIssues = [
  { id: 1, title: "Mobile Network Coverage", brand: "Airtel", searches: 1250 },
  { id: 2, title: "Product Warranty Claims", brand: "Samsung", searches: 980 },
  { id: 3, title: "Flight Cancellations", brand: "IndiGo", searches: 875 },
  { id: 4, title: "Product Returns", brand: "Amazon", searches: 750 },
];

export function TrendingContent({ brands }: { brands: Brand[] }) {
  return (
    <section className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          Popular Brands
        </h2>
        <div className="space-y-4">
          {brands.slice(0, 3).map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-500" />
          Trending Issues
        </h2>
        <div className="space-y-3">
          {trendingIssues.map((issue) => (
            <div
              key={issue.id}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-medium">{issue.title}</h3>
              <p className="text-sm text-muted-foreground">
                {issue.brand} • {issue.searches} searches
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
