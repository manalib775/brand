
import { Navigation } from "@/components/Navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

export default function Blog() {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "Consumer Rights Victory: Major Electronics Refund Case",
      summary: "A landmark case that sets precedent for consumer protection in electronics purchases.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      author: "John Smith",
      date: "April 10, 2024",
      tags: ["Consumer Rights", "Electronics", "Legal"],
      category: "Forum Case"
    },
    {
      id: 2,
      title: "Understanding Your Rights: E-commerce Returns Policy Guide",
      summary: "Everything you need to know about your rights when shopping online.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      author: "Sarah Johnson",
      date: "April 8, 2024",
      tags: ["E-commerce", "Consumer Guide", "Returns"],
      category: "Blog Post"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Blog & News</h1>
            <p className="text-muted-foreground">Latest updates on consumer rights and protection</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search posts..." 
              className="pl-10 w-full max-w-md"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="aspect-video relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
