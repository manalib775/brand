
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  // This would normally be fetched from an API
  const post = {
    id: 1,
    title: "Consumer Rights Victory: Major Electronics Refund Case",
    content: `
      A landmark case in consumer protection has set a new precedent for how electronics companies handle refund requests. The case, which concluded this week, involved a major electronics manufacturer and has significant implications for consumer rights.

      The ruling establishes clear guidelines for when manufacturers must issue refunds for defective products, and importantly, sets time limits for how quickly companies must respond to consumer complaints.

      Key Takeaways:
      • Manufacturers must respond to refund requests within 14 days
      • Defects reported within 30 days of purchase qualify for automatic refunds
      • Companies must provide clear documentation of their refund policies

      This victory represents a significant step forward in consumer protection and sets an important precedent for future cases.
    `,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    author: "John Smith",
    date: "April 10, 2024",
    tags: ["Consumer Rights", "Electronics", "Legal"],
    category: "Forum Case"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <Button 
          variant="ghost" 
          className="mb-8 gap-2"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>

        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
            </div>
          </div>

          <div className="aspect-video relative mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                paragraph.startsWith('•') ? (
                  <li key={index} className="ml-4">{paragraph.substring(1).trim()}</li>
                ) : (
                  <p key={index}>{paragraph.trim()}</p>
                )
              )
            ))}
          </div>

          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
