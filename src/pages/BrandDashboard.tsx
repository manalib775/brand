
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Plus,
  Save,
  LogOut,
  Edit,
} from "lucide-react";
import { BrandDashboardCustomerService } from "@/components/BrandDashboardCustomerService";
import { BrandDashboardAnalytics } from "@/components/BrandDashboardAnalytics";
import { BrandDashboardProducts } from "@/components/BrandDashboardProducts";

export default function BrandDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [brandData, setBrandData] = useState({
    name: "Sample Brand Co.",
    parentCompany: "Brand Holdings Inc.",
    founded: "2018",
    headquarters: "San Francisco, CA",
    history: "Founded in 2018, Sample Brand Co. has been providing innovative solutions to customers worldwide.",
    tollFreeNumber: "1-800-SAMPLE",
    supportEmail: "support@samplebrand.com",
    website: "https://www.samplebrand.com",
    supportHours: "Mon-Fri 9AM-6PM",
    facebook: "https://facebook.com/samplebrand",
    twitter: "https://twitter.com/samplebrand",
    instagram: "https://instagram.com/samplebrand",
    linkedin: "https://linkedin.com/company/samplebrand"
  });

  const handleInputChange = (field: string, value: string) => {
    setBrandData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your changes have been submitted for admin approval."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Brand Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="service">Customer Service</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Brand Information</CardTitle>
                  <CardDescription>Your brand's basic information</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <Save className="h-4 w-4 mr-2" />
                  ) : (
                    <Edit className="h-4 w-4 mr-2" />
                  )}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Brand Name</Label>
                    {isEditing ? (
                      <Input 
                        value={brandData.name} 
                        onChange={(e) => handleInputChange("name", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.name}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Company / Holding Company / Legal Entity</Label>
                    {isEditing ? (
                      <Input 
                        value={brandData.parentCompany} 
                        onChange={(e) => handleInputChange("parentCompany", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.parentCompany}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Founded Year</Label>
                    {isEditing ? (
                      <Input 
                        type="number" 
                        value={brandData.founded} 
                        onChange={(e) => handleInputChange("founded", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.founded}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Headquarters</Label>
                    {isEditing ? (
                      <Input 
                        value={brandData.headquarters} 
                        onChange={(e) => handleInputChange("headquarters", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.headquarters}</div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Brand History</Label>
                  {isEditing ? (
                    <Textarea 
                      className="min-h-[100px]"
                      value={brandData.history}
                      onChange={(e) => handleInputChange("history", e.target.value)}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/20 min-h-[100px]">{brandData.history}</div>
                  )}
                </div>
                {isEditing && (
                  <Button onClick={handleSave} className="mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Customer service contact details</CardDescription>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Phone className="h-4 w-4" /> Toll-Free Number
                    </Label>
                    {isEditing ? (
                      <Input 
                        value={brandData.tollFreeNumber} 
                        onChange={(e) => handleInputChange("tollFreeNumber", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.tollFreeNumber}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Mail className="h-4 w-4" /> Support Email
                    </Label>
                    {isEditing ? (
                      <Input 
                        type="email" 
                        value={brandData.supportEmail} 
                        onChange={(e) => handleInputChange("supportEmail", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.supportEmail}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Globe className="h-4 w-4" /> Website
                    </Label>
                    {isEditing ? (
                      <Input 
                        value={brandData.website} 
                        onChange={(e) => handleInputChange("website", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.website}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Support Hours</Label>
                    {isEditing ? (
                      <Input 
                        value={brandData.supportHours} 
                        onChange={(e) => handleInputChange("supportHours", e.target.value)} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-muted/20">{brandData.supportHours}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect your social media accounts</CardDescription>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={brandData.facebook} 
                      onChange={(e) => handleInputChange("facebook", e.target.value)} 
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/20">{brandData.facebook}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={brandData.twitter} 
                      onChange={(e) => handleInputChange("twitter", e.target.value)} 
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/20">{brandData.twitter}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={brandData.instagram} 
                      onChange={(e) => handleInputChange("instagram", e.target.value)} 
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/20">{brandData.instagram}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={brandData.linkedin} 
                      onChange={(e) => handleInputChange("linkedin", e.target.value)} 
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/20">{brandData.linkedin}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <BrandDashboardProducts />
          </TabsContent>

          <TabsContent value="service">
            <BrandDashboardCustomerService />
          </TabsContent>

          <TabsContent value="analytics">
            <BrandDashboardAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
