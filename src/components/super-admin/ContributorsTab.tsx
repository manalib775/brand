
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Shield, BadgeCheck, UserPlus } from "lucide-react";

export function ContributorsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contributors Management</CardTitle>
          <CardDescription>Manage helpsters, content writers, and other contributors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Search contributors..."
                className="pl-8 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Contributor
              </Button>
              <Button variant="outline">Manage Permissions</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Helpsters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">12 active contributors</p>
                <Button variant="outline" className="w-full">Manage Helpsters</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <BadgeCheck className="h-4 w-4 mr-2 text-green-500" />
                  Content Writers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">5 active contributors</p>
                <Button variant="outline" className="w-full">Manage Writers</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-amber-500" />
                  Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">3 active moderators</p>
                <Button variant="outline" className="w-full">Manage Moderators</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
