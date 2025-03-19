
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
import { ImageIcon, PlusCircle, Search } from "lucide-react";

export function SeoTab() {
  const [activeMetaTag, setActiveMetaTag] = useState("");
  const [activeMetaContent, setActiveMetaContent] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO & Meta Tags Management</CardTitle>
          <CardDescription>Manage website meta tags for better search engine visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Page URL</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter page URL (e.g., /brand/samsung)" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title Tag</Label>
                <Input placeholder="Enter page title (50-60 characters)" maxLength={60} />
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>Recommended: 50-60 characters</span>
                  <span>0/60</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <textarea 
                  className="w-full min-h-[100px] p-2 rounded-md border"
                  placeholder="Enter meta description (150-160 characters)"
                  maxLength={160}
                />
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>Recommended: 150-160 characters</span>
                  <span>0/160</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Custom Meta Tags</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Meta name (e.g., keywords)" 
                    value={activeMetaTag}
                    onChange={(e) => setActiveMetaTag(e.target.value)}
                  />
                  <Input 
                    placeholder="Content"
                    value={activeMetaContent}
                    onChange={(e) => setActiveMetaContent(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Open Graph Tags</Label>
                <div className="space-y-2">
                  <Input placeholder="og:title" />
                  <Input placeholder="og:description" />
                  <div className="flex gap-2">
                    <Input placeholder="og:image" />
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="w-full">Save SEO Settings</Button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
              <div className="text-blue-600 text-lg font-medium mb-1">Sample Title Tag - Your Brand</div>
              <div className="text-green-600 text-sm mb-2">https://yourdomain.com/brand/sample</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">This is a sample meta description that would appear in search engine results. It provides a brief overview of what users can expect on this page...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
