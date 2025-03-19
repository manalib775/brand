
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockProfiles } from "@/data/mockProfiles";
import { useState, useEffect } from "react";
import { ServiceTicketTracker } from "@/components/ServiceTicketTracker";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
  const { isLoggedIn, userProfile, updateProfile, becomeHelpster } = useCustomerAuth();
  const { toast } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showHelpsterDialog, setShowHelpsterDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    location: "",
    email: ""
  });
  const [helpsterData, setHelpsterData] = useState({
    brandName: "",
    expertise: ""
  });
  
  useEffect(() => {
    if (userProfile) {
      setEditedProfile({
        name: userProfile.name,
        location: userProfile.location || "",
        email: userProfile.email
      });
    }
  }, [userProfile]);
  
  if (!isLoggedIn || !userProfile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  
  const handleEditProfile = () => {
    setShowEditDialog(true);
  };
  
  const handleSaveProfile = () => {
    updateProfile({
      name: editedProfile.name,
      location: editedProfile.location,
      email: editedProfile.email
    });
    
    setShowEditDialog(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleHelpsterNomination = () => {
    setShowHelpsterDialog(true);
  };
  
  const handleHelpsterSubmit = () => {
    if (!helpsterData.brandName || !helpsterData.expertise) {
      toast({
        title: "Missing information",
        description: "Please provide both brand name and areas of expertise",
        variant: "destructive"
      });
      return;
    }
    
    const expertiseArray = helpsterData.expertise.split(',').map(item => item.trim());
    becomeHelpster(helpsterData.brandName, expertiseArray);
    
    setShowHelpsterDialog(false);
    toast({
      title: "Helpster request submitted",
      description: "Your request to become a Helpster has been submitted for approval."
    });
    
    // Reset form
    setHelpsterData({
      brandName: "",
      expertise: ""
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <img 
                    src={userProfile.profilePicture || "/placeholder.svg"} 
                    alt={userProfile.name} 
                    className="object-cover"
                  />
                </Avatar>
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-muted-foreground">{userProfile.location || "Location not set"}</span>
                  {userProfile.isVerified && (
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  )}
                </div>
                {userProfile.isHelpster && (
                  <Badge className="bg-blue-500">Helpster</Badge>
                )}
                <div className="text-sm text-muted-foreground">
                  Member since {new Date(userProfile.joinDate).toLocaleDateString()}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Button className="w-full" onClick={handleEditProfile}>Edit Profile</Button>
                  <Button variant="outline" className="w-full" onClick={handleHelpsterNomination}>
                    Become a Helpster
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {userProfile.isHelpster && userProfile.helpsterBrands && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Helpster Status</CardTitle>
                <CardDescription>Brands you actively help with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.helpsterBrands.map((brand, index) => (
                    <div key={index} className="border rounded p-3">
                      <div className="font-medium">{brand.brandName}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Expertise: </span> 
                        {brand.expertise.join(", ")}
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>{brand.helpCount} people helped</span>
                        <span>Since {new Date(brand.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
              <TabsTrigger value="service-tickets">Service Tickets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Products</CardTitle>
                  <CardDescription>
                    Products you've registered with manufacturers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userProfile.products && userProfile.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProfile.products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{product.name}</h3>
                            <Badge variant="outline">{product.brand}</Badge>
                          </div>
                          <div className="mt-2 space-y-1 text-sm">
                            <div><span className="text-muted-foreground">Model:</span> {product.model}</div>
                            <div><span className="text-muted-foreground">Serial:</span> {product.serialNumber}</div>
                            <div><span className="text-muted-foreground">Purchase:</span> {new Date(product.purchaseDate).toLocaleDateString()}</div>
                            <div><span className="text-muted-foreground">Warranty:</span> {new Date(product.warrantyEnd).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No products registered yet.</p>
                      <Button className="mt-4">Register a Product</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                  <CardDescription>
                    Reviews you've left for products and brands.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userProfile.reviews && userProfile.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {userProfile.reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{review.productName}</h3>
                              <div className="text-sm text-muted-foreground">{review.brandName}</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>
                                    {i < review.rating ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {review.rating}/5
                              </span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{review.comment}</p>
                          <div className="mt-2 text-xs text-right text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No reviews yet.</p>
                      <Button className="mt-4">Write a Review</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="complaints" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>
                    Complaints filed with brands and their current status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userProfile.complaints && userProfile.complaints.length > 0 ? (
                    <div className="space-y-4">
                      {userProfile.complaints.map((complaint) => (
                        <div key={complaint.id} className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{complaint.productName}</h3>
                            <Badge 
                              variant={complaint.status === "Resolved" ? "default" : "outline"}
                              className={
                                complaint.status === "Resolved" 
                                  ? "bg-green-500" 
                                  : complaint.status === "In Progress" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {complaint.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{complaint.brandName}</div>
                          <div className="text-sm mt-1">
                            <span className="text-muted-foreground">Ticket: </span>
                            {complaint.ticketNumber}
                          </div>
                          <p className="mt-2 text-sm">{complaint.description}</p>
                          {complaint.resolution && complaint.resolution !== "Pending" && (
                            <div className="mt-2 text-sm p-2 bg-green-50 rounded">
                              <span className="font-medium">Resolution: </span>
                              {complaint.resolution}
                            </div>
                          )}
                          <div className="mt-2 text-xs text-right text-muted-foreground">
                            Filed on {new Date(complaint.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No complaints filed yet.</p>
                      <Button className="mt-4">File a Complaint</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="service-tickets" className="mt-4">
              <ServiceTicketTracker userId={userProfile.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={editedProfile.name} 
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={editedProfile.email} 
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={editedProfile.location} 
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Become Helpster Dialog */}
      <Dialog open={showHelpsterDialog} onOpenChange={setShowHelpsterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Become a Helpster</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input 
                id="brand-name" 
                value={helpsterData.brandName} 
                onChange={(e) => setHelpsterData(prev => ({ ...prev, brandName: e.target.value }))}
                placeholder="e.g., Samsung, Apple, Sony"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise">Areas of Expertise</Label>
              <Textarea 
                id="expertise" 
                value={helpsterData.expertise} 
                onChange={(e) => setHelpsterData(prev => ({ ...prev, expertise: e.target.value }))}
                placeholder="e.g., Smartphones, TVs, Washing Machines (separate by commas)"
              />
              <p className="text-xs text-muted-foreground">
                List your areas of expertise separated by commas. Be specific about products you can help with.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHelpsterDialog(false)}>Cancel</Button>
            <Button onClick={handleHelpsterSubmit}>Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
