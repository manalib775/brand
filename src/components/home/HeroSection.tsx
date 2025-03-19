
import { Search, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Enhanced mock data for suggestions with different types of content
const mockContent = [
  { type: 'brand', name: "Volkswagen", category: "Automotive" },
  { type: 'brand', name: "Toyota", category: "Automotive" },
  { type: 'brand', name: "Honda", category: "Automotive" },
  { type: 'brand', name: "Apple", category: "Technology" },
  { type: 'brand', name: "Samsung", category: "Technology" },
  { type: 'brand', name: "LG", category: "Technology" },
  { type: 'brand', name: "Sony", category: "Technology" },
  { type: 'brand', name: "Microsoft", category: "Technology" },
  { type: 'brand', name: "Google", category: "Technology" },
  { type: 'brand', name: "Amazon", category: "E-commerce" },
  { type: 'product', name: "Galaxy S24 Ultra", brand: "Samsung" },
  { type: 'product', name: "iPhone 15 Pro", brand: "Apple" },
  { type: 'product', name: "Surface Laptop", brand: "Microsoft" },
  { type: 'product', name: "PlayStation 5", brand: "Sony" },
  { type: 'product', name: "Pixel 8", brand: "Google" },
  { type: 'product', name: "MacBook Air", brand: "Apple" },
  { type: 'product', name: "iPad Pro", brand: "Apple" },
  { type: 'product', name: "Neo QLED TV", brand: "Samsung" },
  { type: 'content', name: "How to Handle Customer Complaints", category: "Blog" },
  { type: 'content', name: "Understanding Consumer Rights in India", category: "FAQ" },
  { type: 'content', name: "Top Brands with Best Customer Service", category: "Blog" },
  { type: 'content', name: "Air India Customer Service Tips", category: "Blog" },
  { type: 'content', name: "Indigo Airlines Baggage Policy", category: "FAQ" },
  { type: 'content', name: "Indian Brands Customer Service Rankings", category: "Blog" }
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Improved filter suggestions based on search query - searches within words
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const searchTermLower = searchQuery.toLowerCase();
      
      // Search across all content types and match partial words
      const filtered = mockContent.filter(item => 
        item.name.toLowerCase().includes(searchTermLower) || 
        (item.category && item.category.toLowerCase().includes(searchTermLower)) ||
        (item.brand && item.brand.toLowerCase().includes(searchTermLower))
      );
      
      setSuggestions(filtered.slice(0, 8)); // Show more suggestions
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/brand-category?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.name);
    
    // Navigate based on content type
    if (suggestion.type === 'brand') {
      navigate(`/brand/${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'product') {
      navigate(`/brand/${encodeURIComponent(suggestion.brand)}?product=${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'content') {
      if (suggestion.category === 'Blog') {
        navigate(`/blog?search=${encodeURIComponent(suggestion.name)}`);
      } else if (suggestion.category === 'FAQ') {
        navigate(`/faq?search=${encodeURIComponent(suggestion.name)}`);
      }
    }
    
    setShowSuggestions(false);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Star className="h-4 w-4" />
            Trusted by over 100,000 users
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6 animate-fade-in [animation-delay:200ms]">
            Your Bridge to Better Customer Service
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
            Connect with top brands, track your products, and access customer support—all in one place.
          </p>
          
          <div className="relative max-w-2xl mx-auto animate-fade-in [animation-delay:600ms]">
            <div className="relative shadow-lg rounded-lg" ref={suggestionsRef}>
              <div className="relative">
                <Input
                  placeholder="Search brands, products, or services..."
                  className="h-14 pl-12 pr-32 text-lg rounded-lg border-primary/20 focus:border-primary/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  onFocus={() => {
                    if (suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                
                {searchQuery && (
                  <button 
                    className="absolute right-[90px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={clearSearch}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                
                <Button 
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              
              {/* Enhanced suggestions dropdown with categories */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-background shadow-lg rounded-lg mt-1 border overflow-hidden">
                  <ul className="py-2 max-h-[400px] overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className="px-4 py-3 hover:bg-primary/5 cursor-pointer text-left flex items-center justify-between"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center">
                          <Search className="h-4 w-4 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{suggestion.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {suggestion.type === 'product' ? `${suggestion.brand} Product` : 
                               suggestion.type === 'brand' ? `${suggestion.category} Brand` : 
                               `${suggestion.category}`}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs uppercase text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                          {suggestion.type}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
