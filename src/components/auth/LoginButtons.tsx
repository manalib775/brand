
import { CustomerLoginDialog } from "./CustomerLoginDialog";
import { BrandLoginDialog } from "./BrandLoginDialog";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function LoginButtons() {
  const { isLoggedIn, userProfile, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isLoggedIn && userProfile) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate("/profile")}
        >
          <UserCircle className="h-4 w-4" />
          {userProfile.name?.split(' ')[0] || "Profile"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => {
            logout();
            toast({
              title: "Logged out successfully",
              description: "You have been logged out of your account.",
            });
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <CustomerLoginDialog />
      <BrandLoginDialog />
    </div>
  );
}
