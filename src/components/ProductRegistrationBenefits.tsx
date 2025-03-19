
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BarChart2, Calendar, Truck, Leaf } from "lucide-react";

export function ProductRegistrationBenefits() {
  const benefits = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: "Manage Products in One Place",
      description: "Track all your gadgets, devices, and products in a single dashboard."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Monitor Warranty Status",
      description: "Keep track of warranty periods and get notified before they expire."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Track Maintenance Costs",
      description: "Monitor expenses on product repairs, servicing, and maintenance."
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Carbon Footprint Tracking",
      description: "Estimate environmental impact from your product usage and purchases."
    }
  ];

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Why Register Your Products?</CardTitle>
        <CardDescription>
          Unlock these benefits by registering your products with manufacturers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="mt-1">{benefit.icon}</div>
              <div>
                <h3 className="font-medium">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 border-t">
        <div className="text-sm text-muted-foreground">
          <Truck className="h-4 w-4 inline-block mr-2" />
          Most manufacturers offer extended benefits for registered products!
        </div>
      </CardFooter>
    </Card>
  );
}
