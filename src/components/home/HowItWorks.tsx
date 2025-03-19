
import { 
  CheckCircle, 
  MessageSquare, 
  Star, 
  PhoneCall, 
  Ticket, 
  ArrowUp, 
  Mail, 
  Users,
  AlertTriangle,
  Building2
} from "lucide-react";
import { mockProfiles } from "@/data/mockProfiles";
import type { MockProfile } from "@/data/mockProfiles";

export function HowItWorks() {
  const escalationSteps = [
    {
      title: "Contact Customer Service",
      description: "Reach out to the brand's contact center and explain your issue clearly",
      icon: PhoneCall,
      details: "Keep product details, purchase date, and serial number ready",
    },
    {
      title: "Get Ticket Number",
      description: "Note down your case/ticket number for future reference",
      icon: Ticket,
      details: "Use this number in all future communications",
    },
    {
      title: "Follow Up",
      description: "Track your complaint status using the ticket number",
      icon: Star,
      details: "Allow 48-72 hours for initial response",
    },
    {
      title: "First Escalation",
      description: "Contact the team leader if no response received",
      icon: ArrowUp,
      details: "Reference your original ticket number",
    },
    {
      title: "Corporate Escalation",
      description: "Write to the company's corporate email",
      icon: Mail,
      details: "Include all previous communication details",
    },
    {
      title: "Management Escalation",
      description: "Contact Customer Service Head",
      icon: Users,
      details: "Explain steps taken so far",
    },
    {
      title: "Executive Escalation",
      description: "Write to COO/CEO if still unresolved",
      icon: Building2,
      details: "Last step before social media",
    },
    {
      title: "Public Forums",
      description: "Share on social media as last resort",
      icon: AlertTriangle,
      details: "Include all documentation and previous communication",
    },
    {
      title: "Government Regulators",
      description: "Approach relevant government regulatory body",
      icon: Building2,
      details: "Contact sector-specific government regulators (e.g., Air Sewa for airlines, RBI Ombudsman for banking)",
    }
  ];

  const activeHelpsters = [
    {
      name: "Rahul Sharma",
      expertise: ["Samsung", "LG"],
      helpCount: 156,
      rating: 4.8
    },
    {
      name: "Priya Patel",
      expertise: ["Apple", "OnePlus"],
      helpCount: 98,
      rating: 4.9
    },
    {
      name: "Amit Kumar",
      expertise: ["HDFC Bank", "SBI"],
      helpCount: 234,
      rating: 4.7
    }
  ];

  return (
    <section className="py-12 bg-accent/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Customer Service Guide</h2>
        
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Active Helpsters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeHelpsters.map((helpster, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{helpster.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      {helpster.rating}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Helped {helpster.helpCount} users
                  </p>
                  <p className="text-sm">
                    Expert in: {helpster.expertise.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 relative">
          {escalationSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-background p-6 rounded-lg shadow-sm relative"
            >
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-2">{step.description}</p>
                <p className="text-sm text-muted-foreground">{step.details}</p>
              </div>
              {index < escalationSteps.length - 1 && (
                <div className="absolute left-[2.35rem] top-[4.5rem] bottom-0 w-px bg-border h-16" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-destructive/10 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Important Information to Include:</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Product name and model number",
              "Serial number",
              "Purchase date and location",
              "Detailed description of the issue",
              "Previous communication references",
              "Contact information",
              "Warranty status",
              "Photos/videos of the issue (if applicable)",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Want to Help Others?</h3>
          <p className="text-muted-foreground mb-6">
            Share your expertise and help others with their customer service journey.
            Become a Helpster for your favorite brands!
          </p>
          <button 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => window.location.href = '/profile'}
          >
            <Users className="h-5 w-5" />
            Become a Helpster
          </button>
        </div>
      </div>
    </section>
  );
}
