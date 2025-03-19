
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { Statistics } from "@/components/home/Statistics";
import { BrandCategories } from "@/components/home/BrandCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Shield, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { BrandCard } from "@/components/BrandCard";

// Mock data for brand search
const mockBrands = [
  {
    name: "Samsung Electronics",
    logo: "/placeholder.svg",
    description: "Global leader in consumer electronics and mobile technology",
    subsidiaries: [
      {
        name: "Samsung India Electronics",
        logo: "/placeholder.svg",
        description: "Indian subsidiary of Samsung Electronics"
      },
      {
        name: "Samsung R&D Institute",
        logo: "/placeholder.svg",
        description: "Research and development center"
      }
    ]
  },
  {
    name: "Air India",
    logo: "/placeholder.svg",
    description: "Flag carrier airline of India",
    subsidiaries: [
      {
        name: "Air India Express",
        logo: "/placeholder.svg",
        description: "Low-cost subsidiary of Air India"
      }
    ]
  },
  {
    name: "HDFC Bank",
    logo: "/placeholder.svg",
    description: "Leading private sector bank in India",
    subsidiaries: [
      {
        name: "HDFC Securities",
        logo: "/placeholder.svg",
        description: "Stock broking services"
      }
    ]
  },
  {
    name: "Reliance Industries",
    logo: "/placeholder.svg",
    description: "Indian multinational conglomerate",
    subsidiaries: [
      {
        name: "Jio Platforms",
        logo: "/placeholder.svg",
        description: "Digital services company"
      },
      {
        name: "Reliance Retail",
        logo: "/placeholder.svg",
        description: "Retail business of Reliance Industries"
      }
    ]
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState({
    name: "Consumer Connect",
    logo: "/placeholder.svg"
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="w-full flex-grow">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
          <QuickActions />
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 pointer-events-none" />
            <Statistics />
          </div>
          
          {/* Featured Brands Section */}
          <section className="py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                Featured Brands
              </h2>
              <p className="text-muted-foreground">
                Explore top brands and their subsidiaries
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockBrands.map((brand) => (
                <BrandCard 
                  key={brand.name}
                  brand={brand}
                />
              ))}
            </div>
          </section>
          
          <BrandCategories />
          
          <div className="relative bg-accent/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto">
              <HowItWorks />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
            <Testimonials />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-12 pb-24 border-t">
            <div className="text-center max-w-2xl mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground">
                Join our platform to manage your customer service experience effectively
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2"
                onClick={() => navigate("/brand-dashboard")}
              >
                <ShieldCheck className="h-5 w-5" />
                Brand Dashboard
              </Button>
              <Button 
                variant="default"
                size="lg"
                className="gap-2"
                onClick={() => navigate("/super-admin")}
              >
                <Shield className="h-5 w-5" />
                Super Admin
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Message Center
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogTitle>Brand Messages</DialogTitle>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      This is where brands can send you messages about your feedback or inquiries. 
                      Your personal details are not exposed to brands.
                    </p>
                    <ChatInterface 
                      brandName={selectedBrand.name} 
                      brandLogo={selectedBrand.logo} 
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed messaging button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="default" 
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Brand Messages</DialogTitle>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              This is where brands can send you messages about your feedback or inquiries. 
              Your personal details are not exposed to brands.
            </p>
            <ChatInterface 
              brandName={selectedBrand.name} 
              brandLogo={selectedBrand.logo} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
