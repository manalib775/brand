
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Building2, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CompanyNode {
  id: string;
  name: string;
  logo: string;
  children?: CompanyNode[];
  url?: string;
  foundedYear?: string;
  headquarters?: string;
  description?: string;
}

interface CompanyTreeDiagramProps {
  companyData: CompanyNode;
  className?: string;
}

export function CompanyTreeDiagram({ companyData, className }: CompanyTreeDiagramProps) {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([companyData.id]); // Auto-expand the root node
  const navigate = useNavigate();

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const handleNavigate = (name: string) => {
    navigate(`/brand/${encodeURIComponent(name)}`);
  };

  const handleExternalUrl = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderNode = (node: CompanyNode, depth: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="relative">
        <Card 
          className={cn(
            "p-4 mb-2 w-full bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300",
            "border-l-4", 
            depth === 0 ? "border-l-blue-600" : "border-l-purple-500"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="h-full w-full rounded-md bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                  {node.logo ? (
                    <img 
                      src={node.logo} 
                      alt={node.name} 
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="h-6 w-6 text-primary" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">{node.name}</h3>
                {node.foundedYear && (
                  <p className="text-xs text-muted-foreground">Founded: {node.foundedYear}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {node.url && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExternalUrl(node.url)}
                  className="hidden sm:flex"
                >
                  Website
                  <Globe className="h-3 w-3 ml-1" />
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleNavigate(node.name)}
                className="hidden sm:flex"
              >
                Details
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleNode(node.id)}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  className="relative"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  {!isExpanded && hasChildren && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile buttons */}
          <div className="flex space-x-2 mt-2 sm:hidden">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate(node.name)}
              className="flex-1"
            >
              Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
            {node.url && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExternalUrl(node.url)}
                className="flex-1"
              >
                Website
                <Globe className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
          
          {/* Optional description */}
          {node.description && isExpanded && (
            <div className="mt-2 text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              {node.description}
            </div>
          )}
          
          {/* Optional headquarters */}
          {node.headquarters && isExpanded && (
            <div className="mt-2 text-xs text-muted-foreground">
              Headquarters: {node.headquarters}
            </div>
          )}
        </Card>

        {isExpanded && hasChildren && (
          <div 
            className={cn(
              "pl-8 ml-5 border-l-2 border-dashed border-gray-300 dark:border-gray-700 animate-fade-in",
              depth > 0 && "mt-2"
            )}
          >
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("company-tree-diagram mt-6", className)}>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Building2 className="h-5 w-5 mr-2 text-primary" />
        Company Structure
      </h2>
      {renderNode(companyData)}
    </div>
  );
}
