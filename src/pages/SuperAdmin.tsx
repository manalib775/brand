
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Folders, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import refactored components
import { BulkUploadTab } from "@/components/super-admin/BulkUploadTab";
import { CategoriesTab } from "@/components/super-admin/CategoriesTab";
import { BrandsTab } from "@/components/super-admin/BrandsTab";
import { ContentTab } from "@/components/super-admin/ContentTab";
import { BlogTab } from "@/components/super-admin/BlogTab";
import { SeoTab } from "@/components/super-admin/SeoTab";
import { RegulatoryTab } from "@/components/super-admin/RegulatoryTab";
import { ContributorsTab } from "@/components/super-admin/ContributorsTab";
import { ApprovalsTab } from "@/components/super-admin/ApprovalsTab";
import { MessagesTab } from "@/components/super-admin/MessagesTab";

export default function SuperAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("superAdminLoggedIn") === "true";
  });
  const [showLoginDialog, setShowLoginDialog] = useState(!isLoggedIn);
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("bulk-upload");

  // Check login status on mount
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginCredentials.username || !loginCredentials.password) {
      toast({
        title: "Missing information",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    // For demo, any username with admin123 password works
    if (loginCredentials.password === "admin123") {
      localStorage.setItem("superAdminLoggedIn", "true");
      setIsLoggedIn(true);
      setShowLoginDialog(false);
      toast({
        title: "Login successful",
        description: `Welcome to the Super Admin Dashboard, ${loginCredentials.username}!`
      });
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password (hint: password is 'admin123')",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("superAdminLoggedIn");
    setIsLoggedIn(false);
    setShowLoginDialog(true);
    setLoginCredentials({ username: "", password: "" });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginCredentials(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAddBrand = () => {
    navigate("/brand-registration");
    toast({
      title: "Brand Registration",
      description: "You've been redirected to the Brand Registration page"
    });
  };

  const handleManageCategories = () => {
    navigate("/brand-category");
    toast({
      title: "Manage Categories",
      description: "You've been redirected to the Brand Categories page"
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `${value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')} Tab`,
      description: `You are now viewing the ${value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')} section`
    });
  };

  // If not logged in, show login dialog
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Super Admin Login</DialogTitle>
              <DialogDescription>
                Please enter your credentials to access the Super Admin Dashboard.
                Use any username with password "admin123".
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={loginCredentials.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  value={loginCredentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Login</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={handleAddBrand}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Brand
            </Button>
            <Button variant="outline" onClick={handleManageCategories}>
              <Folders className="h-4 w-4 mr-2" />
              Manage Categories
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="w-full sm:w-auto flex flex-wrap">
            <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="blog">Blog & News</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Bodies</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="bulk-upload">
            <BulkUploadTab />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>

          <TabsContent value="brands">
            <BrandsTab />
          </TabsContent>

          <TabsContent value="content">
            <ContentTab />
          </TabsContent>

          <TabsContent value="blog">
            <BlogTab />
          </TabsContent>

          <TabsContent value="seo">
            <SeoTab />
          </TabsContent>

          <TabsContent value="regulatory">
            <RegulatoryTab />
          </TabsContent>

          <TabsContent value="contributors">
            <ContributorsTab />
          </TabsContent>

          <TabsContent value="approvals">
            <ApprovalsTab />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
