
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type BlogPost = {
  id: number;
  title: string;
  summary: string;
  author: string;
  category: string;
  tags: string;
  publishDate: string;
  image?: string;
};

export function BlogTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Consumer Rights Victory: Major Electronics Refund Case",
      summary: "A landmark case where consumers successfully claimed refunds for faulty electronics",
      author: "Jane Doe",
      category: "News",
      tags: "consumer rights,refunds,electronics",
      publishDate: "2024-04-10",
    }
  ]);
  
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    summary: "",
    author: "",
    category: "Blog Post",
    tags: "",
    publishDate: new Date().toISOString().split('T')[0],
  });
  
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.summary || !formData.author) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingPost) {
      // Update existing post
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === editingPost.id 
            ? { ...post, ...formData as BlogPost } 
            : post
        )
      );
      
      toast({
        title: "Post updated",
        description: "The blog post has been successfully updated."
      });
      
      setEditingPost(null);
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: formData.title || "",
        summary: formData.summary || "",
        author: formData.author || "",
        category: formData.category || "Blog Post",
        tags: formData.tags || "",
        publishDate: formData.publishDate || new Date().toISOString().split('T')[0],
      };
      
      setPosts([...posts, newPost]);
      
      toast({
        title: "Post published",
        description: "Your blog post has been successfully published."
      });
    }
    
    // Reset form
    setFormData({
      title: "",
      summary: "",
      author: "",
      category: "Blog Post",
      tags: "",
      publishDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ ...post });
  };

  const handleDelete = (id: number) => {
    setPostToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (postToDelete !== null) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted."
      });
      
      setShowDeleteConfirm(false);
      setPostToDelete(null);
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      summary: "",
      author: "",
      category: "Blog Post",
      tags: "",
      publishDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingPost ? "Edit Blog Post" : "Blog & News Management"}</CardTitle>
          <CardDescription>
            {editingPost 
              ? "Update the existing blog post details" 
              : "Manage blog posts, news articles, and forum cases"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Post Title</Label>
                <Input 
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  placeholder="Enter post title" 
                />
              </div>
              <div className="space-y-2">
                <Label>Brief Summary</Label>
                <textarea 
                  name="summary"
                  value={formData.summary || ""}
                  onChange={handleInputChange}
                  className="w-full min-h-[100px] p-2 rounded-md border"
                  placeholder="Enter a brief summary of the post"
                />
              </div>
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <Input 
                    type="file" 
                    accept="image/*" 
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended: 1200x630px, JPG or PNG
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input 
                  name="author"
                  value={formData.author || ""}
                  onChange={handleInputChange}
                  placeholder="Enter author name" 
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select 
                  name="category"
                  value={formData.category || "Blog Post"}
                  onChange={handleInputChange}
                  className="w-full rounded-md border p-2"
                >
                  <option>Blog Post</option>
                  <option>News</option>
                  <option>Forum Case</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input 
                  name="tags"
                  value={formData.tags || ""}
                  onChange={handleInputChange}
                  placeholder="Enter tags (comma separated)" 
                />
              </div>
              <div className="space-y-2">
                <Label>Publication Date</Label>
                <Input 
                  type="date" 
                  name="publishDate"
                  value={formData.publishDate || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={handleSubmit}
                >
                  {editingPost ? "Update Post" : "Publish Post"}
                </Button>
                {editingPost && (
                  <Button
                    variant="outline"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            {posts.length > 0 ? (
              <div className="space-y-2">
                {posts.map(post => (
                  <div key={post.id} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">Published on {new Date(post.publishDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No posts found. Create your first blog post above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" /> 
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this post? This action cannot be undone.</p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
