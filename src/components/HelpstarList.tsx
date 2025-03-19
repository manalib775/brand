
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, MessageCircle, Calendar, HelpCircle } from "lucide-react";

interface HelpstarProps {
  brandName: string;
}

interface Helpstar {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  helpCount: number;
  expertise: string[];
  rating: number;
  isOnline: boolean;
}

export function HelpstarList({ brandName }: HelpstarProps) {
  // Mock data for helpstars
  const mockHelpstars: Helpstar[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      avatar: "/placeholder.svg",
      joinDate: "2023-03-15",
      helpCount: 45,
      expertise: ["Mobile Phones", "Smart TVs"],
      rating: 4.8,
      isOnline: true
    },
    {
      id: "2",
      name: "Priya Patel",
      avatar: "/placeholder.svg",
      joinDate: "2023-05-20",
      helpCount: 67,
      expertise: ["MacBooks", "iPhones", "iPads"],
      rating: 4.9,
      isOnline: false
    },
    {
      id: "3",
      name: "Vikram Singh",
      avatar: "/placeholder.svg",
      joinDate: "2023-02-10",
      helpCount: 32,
      expertise: ["Home Appliances", "Smart Home"],
      rating: 4.7,
      isOnline: true
    }
  ];
  
  // Format date to show months ago
  const formatJoinDate = (dateString: string) => {
    const joinDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return `${diffMonths} months ago`;
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="h-5 w-5 text-yellow-500" /> 
          HelpStars for {brandName}
        </CardTitle>
        <CardDescription>
          Community experts who can help with your questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 -mx-1 px-1">
          {mockHelpstars.map((helpstar) => (
            <div 
              key={helpstar.id} 
              className="min-w-[220px] max-w-[220px] border rounded-lg p-4 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={helpstar.avatar} alt={helpstar.name} />
                      <AvatarFallback>{helpstar.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {helpstar.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-sm flex items-center">
                      {helpstar.name}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="ml-1 bg-yellow-500 text-[10px] py-0 px-1.5">★</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified HelpStar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {helpstar.rating} ★ ({helpstar.helpCount} helped)
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs mb-3">
                <div className="flex items-center mb-1">
                  <Calendar className="h-3 w-3 mr-1.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined {formatJoinDate(helpstar.joinDate)}</span>
                </div>
                <div className="flex items-start">
                  <HelpCircle className="h-3 w-3 mr-1.5 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">Expert in: {helpstar.expertise.join(", ")}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-2">
                <Button 
                  variant="secondary" 
                  className="w-full text-xs h-8"
                >
                  <MessageCircle className="h-3 w-3 mr-1.5" />
                  Ask for help
                </Button>
              </div>
            </div>
          ))}
          <div className="min-w-[220px] max-w-[220px] border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <Star className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Become a HelpStar</p>
            <p className="text-xs text-muted-foreground mb-3">Help others and gain recognition</p>
            <Button variant="outline" size="sm" className="w-full">
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
