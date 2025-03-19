
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function BrandLoginDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const field = id.replace("brand-", "");
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validate email domain (must not be common email providers)
    if (field === "email" && value) {
      const domain = value.split('@')[1]?.toLowerCase();
      const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com'];
      
      if (domain && commonDomains.includes(domain)) {
        setEmailError("Please use your company email (not personal email)");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all the fields",
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
    
    // Mock login - in a real app, this would call an auth service
    toast({
      title: "Login successful",
      description: "Welcome to your brand dashboard!",
    });
    
    setIsOpen(false);
    
    // Navigate to brand dashboard in a real application
    navigate("/brand-dashboard");
  };

  const handleRegister = () => {
    setIsOpen(false);
    navigate("/brand-registration");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Brand Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Brand Login</DialogTitle>
          <DialogDescription>
            Sign in to manage your brand profile and customer support.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="brand-email">Business Email</Label>
            <Input 
              id="brand-email" 
              type="email" 
              placeholder="Enter your business email" 
              value={formData.email}
              onChange={handleInputChange}
            />
            {emailError && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {emailError}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Must use your official company email domain
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand-password">Password</Label>
            <Input 
              id="brand-password" 
              type="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button className="w-full" type="submit">Sign In</Button>
        </form>
        <DialogFooter className="flex flex-col">
          <p className="text-sm text-center text-muted-foreground">
            Need to register your brand?{" "}
            <Button variant="link" className="p-0 h-auto" onClick={handleRegister}>
              Register here
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
