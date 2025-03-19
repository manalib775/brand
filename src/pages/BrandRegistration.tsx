
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, AlignLeft, Globe, Mail, Phone, AlertCircle, Lock } from "lucide-react";

export default function BrandRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    brandName: "",
    email: "",
    domain: "",
    website: "",
    phone: "",
    industry: "",
    customIndustry: "",
    description: "",
    address: "",
    contactPerson: "",
    isParentCompany: true,
    parentCompany: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
    
    // Validate email domain against website domain
    if (name === "email") {
      const emailValue = value as string;
      const emailDomain = emailValue.split('@')[1];
      const websiteDomain = formData.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      
      if (emailDomain && websiteDomain && emailDomain !== websiteDomain) {
        setEmailError("Email domain must match your website domain");
      } else {
        setEmailError("");
      }
    }

    // Validate password match
    if (name === "password" || name === "confirmPassword") {
      if (name === "password" && formData.confirmPassword && value !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
      } else if (name === "confirmPassword" && formData.password && value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast({
        title: "Terms not accepted",
        description: "You must accept the terms and conditions to register",
        variant: "destructive"
      });
      return;
    }
    
    if (emailError) {
      toast({
        title: "Invalid email",
        description: emailError,
        variant: "destructive"
      });
      return;
    }

    if (passwordError || !formData.password) {
      toast({
        title: "Password issue",
        description: passwordError || "Please set a password",
        variant: "destructive"
      });
      return;
    }
    
    // Submit registration
    toast({
      title: "Registration submitted",
      description: "Your brand registration has been submitted for review. We'll contact you soon.",
    });
    
    // Redirect to homepage
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Brand Registration</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Register your brand to manage customer service, product listings and more through our platform
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Brand Details</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="form-section">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input 
                  id="brandName" 
                  placeholder="Enter your brand name" 
                  value={formData.brandName}
                  onChange={(e) => handleInputChange("brandName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry Category</Label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(value) => handleInputChange("industry", value)}
                  required
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="homegoods">Home Goods</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.industry === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="customIndustry">Specify Industry</Label>
                  <Input 
                    id="customIndustry" 
                    placeholder="Enter your industry" 
                    value={formData.customIndustry}
                    onChange={(e) => handleInputChange("customIndustry", e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="description">Brand Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of your brand" 
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isParentCompany" 
                    checked={formData.isParentCompany}
                    onCheckedChange={(checked) => handleInputChange("isParentCompany", !!checked)}
                  />
                  <Label htmlFor="isParentCompany">This is a parent company/holding company</Label>
                </div>
              </div>
              
              {!formData.isParentCompany && (
                <div className="space-y-2">
                  <Label htmlFor="parentCompany">Parent Company / Holding Company / Legal Entity</Label>
                  <Input 
                    id="parentCompany" 
                    placeholder="Enter parent company or legal entity name" 
                    value={formData.parentCompany}
                    onChange={(e) => handleInputChange("parentCompany", e.target.value)}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="form-section">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="website" 
                    placeholder="www.yourcompany.com" 
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="contact@yourcompany.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-destructive flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {emailError}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Must be an email with your company domain (same as your website)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    placeholder="Enter contact phone number" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-muted-foreground align-top mt-2" />
                  <Textarea 
                    id="address" 
                    placeholder="Enter your business address" 
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Primary Contact Person</Label>
                <Input 
                  id="contactPerson" 
                  placeholder="Full name of primary contact" 
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Set Password</Label>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a password" 
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-sm text-destructive flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {passwordError}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Your email address will be your username
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="verification" className="form-section">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verification Requirements</CardTitle>
                  <CardDescription>
                    We'll need to verify your brand before approval
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center text-primary">1</div>
                    <div>
                      <h4 className="font-medium">Domain Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll send a verification email to the address you provided. 
                        The email domain must match your website domain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center text-primary">2</div>
                    <div>
                      <h4 className="font-medium">Business Documentation</h4>
                      <p className="text-sm text-muted-foreground">
                        Our team may request business registration documents to verify your brand's authenticity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center text-primary">3</div>
                    <div>
                      <h4 className="font-medium">Admin Approval</h4>
                      <p className="text-sm text-muted-foreground">
                        After verification, a system administrator will approve your account or request additional information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="termsAccepted" 
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", !!checked)}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="termsAccepted" className="text-sm font-medium leading-none">
                      I accept the terms and conditions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By registering, you agree to our Terms of Service and Privacy Policy.
                      You confirm that all provided information is accurate and that you are
                      authorized to register this brand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" type="button" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit">Submit Registration</Button>
        </div>
      </form>
    </div>
  );
}
