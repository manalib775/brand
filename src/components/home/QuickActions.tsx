
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { 
  Shield, 
  MapPin, 
  AlertCircle, 
  Star
} from "lucide-react";

const quickActions = [
  { 
    id: 1, 
    title: "Track Warranty", 
    description: "Check your product warranty status",
    icon: Shield,
    color: "text-blue-500"
  },
  { 
    id: 2, 
    title: "Service Centers", 
    description: "Find nearest service centers",
    icon: MapPin,
    color: "text-green-500"
  },
  { 
    id: 3, 
    title: "File Complaint", 
    description: "Register your consumer complaints",
    icon: AlertCircle,
    color: "text-red-500"
  },
  { 
    id: 4, 
    title: "Rate Experience", 
    description: "Share your customer service experience",
    icon: Star,
    color: "text-yellow-500"
  },
];

export function QuickActions() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Quick Actions
        </h2>
        <p className="text-muted-foreground">
          Get started with these common tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card 
            key={action.id} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <CardHeader>
              <div className={`${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg mb-2">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
