
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Singh",
    comment: "Got my warranty issue resolved within 24 hours. Excellent platform!",
    rating: 5,
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    comment: "Easy to find customer service contacts. Saved me hours of searching!",
    rating: 4,
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Anita Patel",
    comment: "The brand verification feature gives me confidence in the service.",
    rating: 5,
    date: "2 weeks ago",
  },
];

export function Testimonials() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-6 border rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground">{testimonial.comment}</p>
            <div className="flex items-center justify-between">
              <span className="font-medium">{testimonial.name}</span>
              <span className="text-sm text-muted-foreground">{testimonial.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button size="lg">
          Get Started
        </Button>
      </div>
    </section>
  );
}
