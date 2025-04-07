import { useState, useEffect } from "react";
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
import { Building2, AlignLeft, Globe, Mail, Phone, AlertCircle, Lock, Loader2, Info, CheckCircle, XCircle } from "lucide-react";
import { registerBrand, BrandRegistrationData, testBrandsTableConnection } from "@/services/brandService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BrandRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{ checked: boolean; connected: boolean; error?: string }>({
    checked: false,
    connected: false
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        const result = await testBrandsTableConnection();
        setConnectionStatus({ 
          checked: true, 
          connected: result.success,
          error: result.error
        });
        
        if (!result.success) {
          console.error('Supabase connection error:', result.error);
          toast({
            title: "Database connection issue",
            description: result.error || "There's a problem connecting to our database. Your registration may not be saved.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Database connection successful",
            description: "Successfully connected to Supabase brands table.",
          });
        }
      } catch (error) {
        console.error('Error testing connection:', error);
        setConnectionStatus({ 
          checked: true, 
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown connection error'
        });
      }
    };
    
    testConnection();
  }, [toast]);

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
  const [registrationError, setRegistrationError] = useState<{message: string; code?: string; rlsHelp?: string} | null>(null);
  
  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
    
    if (registrationError) {
      setRegistrationError(null);
    }
    
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
  
  const handleSubmit = async (e: React.FormEvent) => {
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
    
    setIsSubmitting(true);
    setRegistrationError(null);
    
    toast({
      title: "Processing registration",
      description: "Please wait while we process your registration...",
    });
    
    const brandData: BrandRegistrationData = {
      brandName: formData.brandName,
      email: formData.email,
      domain: formData.domain || formData.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0],
      website: formData.website,
      phone: formData.phone,
      industry: formData.industry,
      customIndustry: formData.customIndustry,
      description: formData.description,
      address: formData.address,
      contactPerson: formData.contactPerson,
      isParentCompany: formData.isParentCompany,
      parentCompany: formData.parentCompany,
    };
    
    try {
      const result = await registerBrand(brandData, formData.password);
      
      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Your brand has been registered successfully. Welcome aboard!",
        });
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setRegistrationError({
          message: result.error || "An unknown error occurred",
          code: result.errorCode,
          rlsHelp: result.rlsHelp
        });
        
        toast({
          title: "Registration failed",
          description: result.error || "An unknown error occurred. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationError({
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getErrorGuide = () => {
    if (!registrationError) return null;
    
    if (registrationError.code === 'user_already_exists') {
      return (
        <Alert className="bg-amber-50 mt-4">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Email already in use</AlertTitle>
          <AlertDescription className="text-amber-700">
            <p>This email address is already registered in our system. You can:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Try signing in with this email instead</li>
              <li>Use a different email address for registration</li>
              <li>Contact support if you don't remember registering</li>
            </ul>
          </AlertDescription>
        </Alert>
      );
    }
    
    if (registrationError.code === 'rls_violation') {
      return (
        <Alert className="bg-amber-50 mt-4">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Database Permission Issue</AlertTitle>
          <AlertDescription className="text-amber-700">
            <p>Supabase Row Level Security (RLS) is preventing brand registration.</p>
            <p className="mt-2">This is a technical issue that needs to be fixed in the Supabase dashboard.</p>
            
            {registrationError.rlsHelp && (
              <div className="mt-4 p-3 bg-amber-100 rounded-md">
                <h4 className="font-medium mb-2">How to fix:</h4>
                <pre className="whitespace-pre-wrap text-xs overflow-auto max-h-60 bg-amber-50 p-2 rounded">
                  {registrationError.rlsHelp}
                </pre>
              </div>
            )}
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
      <Alert className="bg-red-50 mt-4">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-800">Registration Error</AlertTitle>
        <AlertDescription className="text-red-700">
          {registrationError.message}
        </AlertDescription>
      </Alert>
    );
  };
  
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-6">
        {connectionStatus.checked && (
          <Alert className={connectionStatus.connected ? "bg-green-50" : "bg-red-50"}>
            <div className="flex items-center">
              {connectionStatus.connected ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <div>
                <AlertTitle className={connectionStatus.connected ? "text-green-800" : "text-red-800"}>
                  Database Connection: {connectionStatus.connected ? "Successful" : "Failed"}
                </AlertTitle>
                <AlertDescription className={connectionStatus.connected ? "text-green-700" : "text-red-700"}>
                  {connectionStatus.connected 
                    ? "Successfully connected to the brands table in Supabase." 
                    : `Unable to connect to the brands table: ${connectionStatus.error || "Unknown error"}`}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
        
        {registrationError && getErrorGuide()}
      </div>

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
                    className={registrationError?.code === 'user_already_exists' ? 'border-amber-500 focus-visible:ring-amber-500' : ''}
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Submit Registration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
