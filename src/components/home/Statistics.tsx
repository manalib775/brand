
import { Users, Building2, ShieldCheck, Award } from "lucide-react";

const statistics = [
  { id: 1, label: "Active Users", value: "100,000+", icon: Users },
  { id: 2, label: "Registered Brands", value: "1,000+", icon: Building2 },
  { id: 3, label: "Issues Resolved", value: "50,000+", icon: ShieldCheck },
  { id: 4, label: "Customer Satisfaction", value: "95%", icon: Award },
];

export function Statistics() {
  return (
    <section className="py-12 bg-primary/5 -mx-4 px-4 rounded-3xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statistics.map((stat) => (
          <div key={stat.id} className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
