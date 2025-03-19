
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Create a context to manage customer login state
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

export function CustomerLoginDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: ""
  });
  
  const { isLoggedIn, userProfile, login, logout } = useCustomerAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace("customer-", "")]: value
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    if (isRegistration) {
      // Registration-specific validation
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          variant: "destructive"
        });
        return;
      }

      if (!formData.name || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all the required fields",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email for OTP verification.",
      });
      
      // Simulate OTP verification process
      setIsOpen(false);
      navigate("/otp-verification", { 
        state: { 
          email: formData.email,
          name: formData.name
        } 
      });
    } else {
      // Login
      login({
        id: "new-user",
        name: formData.name || "Customer",
        email: formData.email,
        location: "Location not set",
        joinDate: new Date().toISOString(),
        isVerified: true,
        profilePicture: "/placeholder.svg",
        products: [],
        reviews: [],
        complaints: []
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back to ConsumerConnect!",
      });
      
      setIsOpen(false);
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const toggleMode = () => {
    setIsRegistration(!isRegistration);
    // Reset form data when switching modes
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: ""
    });
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate("/profile")}
        >
          <UserCircle className="h-4 w-4" />
          {userProfile?.name?.split(' ')[0] || "Profile"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          Customer Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isRegistration ? "Customer Registration" : "Customer Login"}</DialogTitle>
          <DialogDescription>
            {isRegistration 
              ? "Register to track your products and access support."
              : "Sign in to access your registered products and support."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {isRegistration && (
            <div className="space-y-2">
              <Label htmlFor="customer-name">Full Name</Label>
              <Input 
                id="customer-name" 
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="customer-email">Email</Label>
            <Input 
              id="customer-email" 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          {isRegistration && (
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Phone Number</Label>
              <Input 
                id="customer-phone" 
                type="tel" 
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="customer-password">Password</Label>
            <Input 
              id="customer-password" 
              type="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          {isRegistration && (
            <div className="space-y-2">
              <Label htmlFor="customer-confirmPassword">Confirm Password</Label>
              <Input 
                id="customer-confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          <Button className="w-full" type="submit">
            {isRegistration ? "Register" : "Sign In"}
          </Button>
          
          <p className="text-sm text-center text-muted-foreground">
            {isRegistration ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button variant="link" className="p-0 h-auto" onClick={toggleMode}>
              {isRegistration ? "Sign In" : "Register"}
            </Button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
