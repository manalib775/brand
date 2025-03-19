
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BrandTabOrder } from "./BrandTabOrder";

type BrandTab = {
  id: string;
  name: string;
};

export function BrandsTab() {
  const [brandTabs, setBrandTabs] = useState<BrandTab[]>([
    { id: "metrics", name: "Service Metrics" },
    { id: "structure", name: "Company Structure" },
    { id: "overview", name: "Overview" },
    { id: "support", name: "Support" },
    { id: "connect", name: "Connect" }
  ]);
  
  const [brandFormData, setBrandFormData] = useState({
    name: "",
    parentCompany: "",
    founded: "",
    headquarters: "",
    description: "",
    industry: "",
    customIndustry: "",
    phone: "",
    customerServicePhone: "",
    email: "",
    website: "",
    supportHours: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  });

  const { toast } = useToast();

  const handleBrandFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBrandFormData({
      ...brandFormData,
      [name]: value
    });
  };

  const handleIndustryChange = (value: string) => {
    setBrandFormData({
      ...brandFormData,
      industry: value
    });
  };

  const handleSaveBrand = () => {
    console.log("Brand data saved:", brandFormData);
    toast({
      title: "Brand saved",
      description: `${brandFormData.name} has been saved successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand Management</CardTitle>
          <CardDescription>Add and edit brand information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-end">
            <BrandTabOrder 
              brandTabs={brandTabs} 
              onTabsUpdate={setBrandTabs} 
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Brand Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <Input type="file" accept="image/*" className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 200x200px, PNG or SVG
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Banner Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <Input type="file" accept="image/*" className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 1920x400px, JPG or PNG
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Brand Name</Label>
                <Input 
                  name="name"
                  value={brandFormData.name}
                  onChange={handleBrandFormChange}
                  placeholder="Enter brand name" 
                />
              </div>
              <div className="space-y-2">
                <Label>Parent Company / Holding Company / Legal Entity</Label>
                <Input 
                  name="parentCompany"
                  value={brandFormData.parentCompany}
                  onChange={handleBrandFormChange}
                  placeholder="Enter parent company or legal entity name" 
                />
              </div>
              <div className="space-y-2">
                <Label>Founded Year</Label>
                <Input 
                  name="founded"
                  value={brandFormData.founded}
                  onChange={handleBrandFormChange}
                  type="number" 
                  placeholder="Enter founded year" 
                />
              </div>
              <div className="space-y-2">
                <Label>Headquarters</Label>
                <Input 
                  name="headquarters"
                  value={brandFormData.headquarters}
                  onChange={handleBrandFormChange}
                  placeholder="Enter headquarters location" 
                />
              </div>
              <div className="space-y-2">
                <Label>Brand Description</Label>
                <Textarea 
                  name="description"
                  value={brandFormData.description}
                  onChange={handleBrandFormChange}
                  placeholder="Enter brand description" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Industry Category</Label>
                <Select 
                  value={brandFormData.industry}
                  onValueChange={handleIndustryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics & Mobile</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="home">Home Appliances</SelectItem>
                    <SelectItem value="finance">Banking & Finance</SelectItem>
                    <SelectItem value="telecom">Telecommunications</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {brandFormData.industry === "other" && (
                <div className="space-y-2">
                  <Label>Specify Industry</Label>
                  <Input 
                    name="customIndustry"
                    value={brandFormData.customIndustry}
                    onChange={handleBrandFormChange}
                    placeholder="Enter custom industry" 
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Toll-Free Support Phone</Label>
                <Input 
                  name="phone"
                  value={brandFormData.phone}
                  onChange={handleBrandFormChange}
                  placeholder="Enter toll-free support number" 
                />
              </div>

              <div className="space-y-2">
                <Label>Customer Service Phone</Label>
                <Input 
                  name="customerServicePhone"
                  value={brandFormData.customerServicePhone}
                  onChange={handleBrandFormChange}
                  placeholder="Enter customer service number" 
                />
              </div>

              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input 
                  name="email"
                  value={brandFormData.email}
                  onChange={handleBrandFormChange}
                  type="email" 
                  placeholder="Enter support email" 
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input 
                  name="website"
                  value={brandFormData.website}
                  onChange={handleBrandFormChange}
                  placeholder="Enter website URL" 
                />
              </div>
              <div className="space-y-2">
                <Label>Support Hours</Label>
                <Input 
                  name="supportHours"
                  value={brandFormData.supportHours}
                  onChange={handleBrandFormChange}
                  placeholder="e.g., Mon-Fri 9AM-6PM" 
                />
              </div>
              <div className="space-y-2">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs flex items-center">
                      <Facebook className="h-3 w-3 mr-1" /> Facebook
                    </Label>
                    <Input 
                      name="facebook"
                      value={brandFormData.facebook}
                      onChange={handleBrandFormChange}
                      placeholder="Facebook URL" 
                      className="text-sm" 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs flex items-center">
                      <Twitter className="h-3 w-3 mr-1" /> Twitter
                    </Label>
                    <Input 
                      name="twitter"
                      value={brandFormData.twitter}
                      onChange={handleBrandFormChange}
                      placeholder="Twitter URL" 
                      className="text-sm" 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs flex items-center">
                      <Instagram className="h-3 w-3 mr-1" /> Instagram
                    </Label>
                    <Input 
                      name="instagram"
                      value={brandFormData.instagram}
                      onChange={handleBrandFormChange}
                      placeholder="Instagram URL" 
                      className="text-sm" 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs flex items-center">
                      <Linkedin className="h-3 w-3 mr-1" /> LinkedIn
                    </Label>
                    <Input 
                      name="linkedin"
                      value={brandFormData.linkedin}
                      onChange={handleBrandFormChange}
                      placeholder="LinkedIn URL" 
                      className="text-sm" 
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={handleSaveBrand}>Save Brand</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
