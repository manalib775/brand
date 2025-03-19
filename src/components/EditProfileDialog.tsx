
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MockProfile } from "@/data/mockProfiles";
import { Upload, Camera } from "lucide-react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

export function EditProfileDialog({ profile }: { profile: MockProfile }) {
  const { toast } = useToast();
  const { updateProfile } = useCustomerAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    location: profile.location,
    bio: profile.bio || "",
    phone: profile.phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name || !formData.email || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Update profile
    updateProfile({
      name: formData.name,
      email: formData.email,
      location: formData.location,
      bio: formData.bio,
      phone: formData.phone,
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and profile settings
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage 
                src={profile.profilePicture || "/placeholder.svg"} 
                alt={profile.name} 
                className="object-cover"
              />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" type="button">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm" type="button">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio / About Me (Optional)</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell others a bit about yourself..."
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
