
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, LayoutGrid, Upload, PenLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContentTab() {
  const { toast } = useToast();

  const handleContentAction = (action: string) => {
    toast({
      title: `${action} section opened`,
      description: `You can now edit the ${action.toLowerCase()} content.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>Manage website content and layouts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-24 space-y-2 flex flex-col items-center justify-center" 
            onClick={() => handleContentAction("Homepage Layout")}
          >
            <LayoutGrid className="h-6 w-6" />
            <span>Homepage Layout</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 space-y-2 flex flex-col items-center justify-center" 
            onClick={() => handleContentAction("Brand Pages")}
          >
            <Building className="h-6 w-6" />
            <span>Brand Pages</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 space-y-2 flex flex-col items-center justify-center" 
            onClick={() => handleContentAction("Media Library")}
          >
            <Upload className="h-6 w-6" />
            <span>Media Library</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 space-y-2 flex flex-col items-center justify-center" 
            onClick={() => handleContentAction("Notification Templates")}
          >
            <PenLine className="h-6 w-6" />
            <span>Notification Templates</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
