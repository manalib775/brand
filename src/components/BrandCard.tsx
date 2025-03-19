
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CompanyTreeDiagram } from "@/components/CompanyTreeDiagram";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  id?: string;
}

interface Subsidiary {
  name: string;
  logo?: string;
  products?: Product[];
  subsidiaries?: Subsidiary[];
  description?: string;
}

interface BrandCardProps {
  brand: {
    name: string;
    logo: string;
    rating?: number;
    description?: string;
    subsidiaries?: Subsidiary[];
    companyStructure?: any; // For the tree diagram
    supportHours?: string;
    email?: string;
  };
  isSubsidiary?: boolean;
}

export function BrandCard({ brand, isSubsidiary = false }: BrandCardProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTreeDialog, setShowTreeDialog] = useState(false);

  const handleViewDetails = (e: React.MouseEvent, brandName: string) => {
    e.stopPropagation();
    navigate(`/brand/${encodeURIComponent(brandName)}`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      if (brand.companyStructure) {
        setShowTreeDialog(true);
      } else if (brand.subsidiaries && brand.subsidiaries.length > 0) {
        setIsExpanded(!isExpanded);
      } else {
        navigate(`/brand/${encodeURIComponent(brand.name)}`);
      }
    }
  };

  // Get first letter of brand name for logo placeholder
  const brandInitial = brand.name[0];

  return (
    <>
      <Card 
        className={cn(
          "w-full max-w-full transition-all duration-300 cursor-pointer relative",
          "hover:shadow-md hover:border-primary/20",
          isSubsidiary ? "border-l-2 border-l-primary/30" : ""
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {brandInitial}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm leading-tight truncate">{brand.name}</h3>
              {brand.description && (
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {brand.description}
                </p>
              )}
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(e, brand.name);
                }}
                className="h-7 px-2 text-xs"
              >
                <ExternalLink size={10} className="mr-1" />
                Details
              </Button>
              
              {(brand.subsidiaries?.length > 0 || brand.companyStructure) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (brand.companyStructure) {
                      setShowTreeDialog(true);
                    } else {
                      setIsExpanded(!isExpanded);
                    }
                  }}
                  className="h-7 w-7 p-0"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        
        {isExpanded && brand.subsidiaries && brand.subsidiaries.length > 0 && (
          <div className="px-3 pb-3 pt-0 border-t border-dashed border-gray-200 bg-accent/30">
            <div className="mt-1">
              <div className="space-y-1.5">
                {brand.subsidiaries.map((subsidiary) => (
                  <div key={subsidiary.name} className="pl-2 border-l-2 border-l-primary/30">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-xs">{subsidiary.name}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleViewDetails(e, subsidiary.name)}
                        className="h-5 px-1.5 py-0 text-xs"
                      >
                        <ExternalLink size={8} className="mr-1" />
                        Details
                      </Button>
                    </div>
                    {subsidiary.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 text-[10px]">{subsidiary.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Tree Diagram Dialog */}
      <Dialog open={showTreeDialog} onOpenChange={setShowTreeDialog}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogTitle>Company Structure: {brand.name}</DialogTitle>
          <div className="flex-1 overflow-auto">
            {brand.companyStructure ? (
              <CompanyTreeDiagram companyData={brand.companyStructure} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No company structure data available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
