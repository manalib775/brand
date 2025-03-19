
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink, Clock, Phone, Mail, HelpCircle } from "lucide-react";

interface Authority {
  name: string;
  description: string;
  url: string;
  contactPhone?: string;
  contactEmail?: string;
  turnaroundTime?: string;
  escalationLevel: number;
}

interface RegulatoryAuthoritiesProps {
  authorities: Authority[];
  industryName: string;
}

export function RegulatoryAuthorities({ authorities, industryName }: RegulatoryAuthoritiesProps) {
  // Sort authorities by escalation level
  const sortedAuthorities = [...authorities].sort((a, b) => a.escalationLevel - b.escalationLevel);
  
  return (
    <section className="mt-8 mb-12">
      <div className="flex items-center mb-4">
        <Shield className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-semibold">Regulatory Authorities for {industryName}</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        If your issue isn't resolved by the company, you can escalate to these regulatory bodies:
      </p>
      
      <div className="space-y-4">
        {sortedAuthorities.map((authority, index) => (
          <Card key={authority.name} className={
            index === 0 
              ? "border-l-4 border-l-green-500" 
              : index === sortedAuthorities.length - 1 
                ? "border-l-4 border-l-red-500" 
                : "border-l-4 border-l-yellow-500"
          }>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{authority.name}</CardTitle>
                  <CardDescription>
                    Escalation Level: {authority.escalationLevel}
                    {index === sortedAuthorities.length - 1 && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Final Authority
                      </span>
                    )}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(authority.url, '_blank', 'noopener,noreferrer')}
                >
                  Visit Portal
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{authority.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {authority.contactPhone && (
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1 text-primary" />
                    <span>{authority.contactPhone}</span>
                  </div>
                )}
                
                {authority.contactEmail && (
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-primary" />
                    <span>{authority.contactEmail}</span>
                  </div>
                )}
                
                {authority.turnaroundTime && (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-primary" />
                    <span>Response time: {authority.turnaroundTime}</span>
                  </div>
                )}
              </div>
              
              {index < sortedAuthorities.length - 1 && (
                <div className="mt-3 pt-3 border-t border-dashed flex items-center text-xs text-muted-foreground">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  <span>Escalate to the next level if no response within {authority.turnaroundTime || "the specified timeframe"}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
