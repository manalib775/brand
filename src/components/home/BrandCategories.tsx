import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Smartphone, 
  Home as HomeIcon, 
  Car, 
  Shirt, 
  Building2, 
  Plane, 
  Phone, 
  ShoppingBag 
} from "lucide-react";

const categories = [
  { 
    id: "electronics",
    name: "Electronics & Mobile",
    count: 245,
    icon: Smartphone,
    companies: [
      { 
        name: "Samsung Electronics", 
        logo: "/samsung.png",
        description: "Global leader in consumer electronics and mobile technology",
        subsidiaries: [
          {
            name: "Samsung India Electronics",
            description: "Indian subsidiary of Samsung Electronics"
          }
        ]
      },
      { 
        name: "Apple Inc.", 
        logo: "/apple.png",
        description: "Innovative technology company known for iPhone, Mac and services" 
      },
      { 
        name: "LG Electronics", 
        logo: "/lg.png",
        description: "Global electronics manufacturer of appliances and devices" 
      },
      { 
        name: "Sony Corporation", 
        logo: "/sony.png",
        description: "Multinational conglomerate known for electronics and entertainment" 
      },
      { 
        name: "Xiaomi", 
        logo: "/xiaomi.png",
        description: "Leading smartphone and smart device manufacturer" 
      }
    ]
  },
  { 
    id: "appliances",
    name: "Home Appliances",
    count: 189,
    icon: HomeIcon,
    companies: [
      { name: "Whirlpool Corporation", logo: "/whirlpool.png" },
      { name: "Haier", logo: "/haier.png" },
      { name: "Bosch", logo: "/bosch.png" },
      { name: "Electrolux", logo: "/electrolux.png" },
      { name: "Panasonic", logo: "/panasonic.png" }
    ]
  },
  { 
    id: "automotive",
    name: "Vehicles",
    count: 156,
    icon: Car,
    companies: [
      { name: "Volkswagen Group", logo: "/vw.png" },
      { name: "Toyota Motor", logo: "/toyota.png" },
      { name: "Honda Motor", logo: "/honda.png" },
      { name: "BMW Group", logo: "/bmw.png" },
      { name: "Mercedes-Benz", logo: "/mercedes.png" }
    ]
  },
  { 
    id: "personal_care",
    name: "Personal Care",
    count: 203,
    icon: Shirt,
    companies: [
      { name: "Procter & Gamble", logo: "/pg.png" },
      { name: "Unilever", logo: "/unilever.png" },
      { name: "L'Oréal", logo: "/loreal.png" },
      { name: "Johnson & Johnson", logo: "/jnj.png" },
      { name: "Colgate-Palmolive", logo: "/colgate.png" }
    ]
  },
  { 
    id: "retail",
    name: "Retail & Fashion",
    count: 167,
    icon: ShoppingBag,
    companies: [
      { name: "Walmart", logo: "/walmart.png" },
      { name: "Amazon", logo: "/amazon.png" },
      { name: "Nike", logo: "/nike.png" },
      { name: "H&M", logo: "/hm.png" },
      { name: "Zara", logo: "/zara.png" }
    ]
  },
  { 
    id: "airlines",
    name: "Airlines",
    count: 45,
    icon: Plane,
    companies: [
      { name: "Air India", logo: "/airindia.png" },
      { name: "IndiGo", logo: "/indigo.png" },
      { name: "SpiceJet", logo: "/spicejet.png" },
      { name: "Vistara", logo: "/vistara.png" },
      { name: "Air Asia India", logo: "/airasia.png" }
    ]
  },
  { 
    id: "telecom",
    name: "Telecom",
    count: 38,
    icon: Phone,
    companies: [
      { name: "Airtel", logo: "/airtel.png" },
      { name: "Jio", logo: "/jio.png" },
      { name: "Vodafone Idea", logo: "/vi.png" },
      { name: "BSNL", logo: "/bsnl.png" },
      { name: "MTNL", logo: "/mtnl.png" }
    ]
  },
  { 
    id: "consumer_goods",
    name: "Consumer Goods",
    count: 178,
    icon: Building2,
    companies: [
      { name: "Nestlé", logo: "/nestle.png" },
      { name: "Coca-Cola", logo: "/cocacola.png" },
      { name: "PepsiCo", logo: "/pepsico.png" },
      { name: "Mondelez", logo: "/mondelez.png" },
      { name: "Kraft Heinz", logo: "/kraftheinz.png" }
    ]
  },
];

export function BrandCategories() {
  const navigate = useNavigate();

  return (
    <section id="industries" className="relative">
      <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="group p-4 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors cursor-pointer"
              onClick={() => navigate(`/brand-category/${category.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-muted-foreground">
                {category.count} brands
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
