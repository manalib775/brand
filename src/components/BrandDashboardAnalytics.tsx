
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, BarChart3, Star } from "lucide-react";

export function BrandDashboardAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Customer Feedback Analytics
          </CardTitle>
          <CardDescription>Track customer satisfaction and feedback trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Awaiting Customer Feedback</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              No customer reviews or feedback data is available yet. Encourage your customers to share their experiences to start building your brand reputation.
            </p>
            <div className="space-y-4 max-w-md">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" /> 
                  Tips to get more reviews
                </h4>
                <ul className="text-sm space-y-2 text-left list-disc pl-5">
                  <li>Send follow-up emails after purchase asking for feedback</li>
                  <li>Offer small incentives for customers who leave reviews</li>
                  <li>Make the review process simple and accessible</li>
                  <li>Respond to existing reviews to show you value feedback</li>
                  <li>Add review requests to packaging and receipts</li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <TrendingUp className="h-3 w-3 mr-1" /> 
                  Analytics will appear as reviews come in
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
