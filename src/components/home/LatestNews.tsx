
import { Newspaper, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const latestNews = [
  {
    id: 1,
    title: "New Consumer Protection Guidelines Released",
    category: "Consumer Rights",
    date: "2 hours ago",
    description: "Latest guidelines aim to strengthen consumer rights in digital age."
  },
  {
    id: 2,
    title: "Major Electronics Brands Extend Warranty Support",
    category: "Industry News",
    date: "1 day ago",
    description: "Leading electronics manufacturers announce extended warranty periods."
  },
  {
    id: 3,
    title: "Customer Service Excellence Awards 2024",
    category: "Awards",
    date: "2 days ago",
    description: "Annual awards ceremony recognizes top performing brands in customer service."
  }
];

export function LatestNews() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Newspaper className="h-6 w-6 text-primary" />
        Latest News & Updates
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {latestNews.map((news) => (
          <Card key={news.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                {news.date}
              </div>
              <CardTitle className="text-lg">{news.title}</CardTitle>
              <CardDescription>{news.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group">
                Read More 
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
