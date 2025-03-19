
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProfiles, MockProfile, MockProduct } from "@/data/mockProfiles";
import { useToast } from "@/components/ui/use-toast";

const ticketSchema = z.object({
  ticketNumber: z.string().min(3, {
    message: "Ticket number must be at least 3 characters.",
  }),
  productId: z.string(),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

interface ServiceTicketTrackerProps {
  userId: string;
  productId?: string;
}

export function ServiceTicketTracker({ userId, productId }: ServiceTicketTrackerProps) {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<MockProfile | undefined>(
    mockProfiles.find(profile => profile.id === userId)
  );
  
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      ticketNumber: "",
      productId: productId || "",
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    if (!userProfile) return;
    
    const productToUpdate = userProfile.products.find(p => p.id === data.productId);
    
    if (!productToUpdate) {
      toast({
        title: "Error",
        description: "Product not found. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate adding a new complaint
    const newComplaint = {
      id: `c${Date.now()}`,
      brandName: productToUpdate.brand,
      productName: productToUpdate.name,
      ticketNumber: data.ticketNumber,
      status: "Submitted",
      description: "Awaiting details",
      date: new Date().toISOString().split('T')[0],
      resolution: "Pending",
    };
    
    // Update the user profile (this is just in-memory, would be a database call in a real app)
    const updatedProfile = {
      ...userProfile,
      complaints: [...userProfile.complaints, newComplaint],
    };
    
    setUserProfile(updatedProfile);
    
    toast({
      title: "Ticket Added",
      description: `Ticket ${data.ticketNumber} has been saved to your profile.`,
    });
    
    form.reset();
  };

  if (!userProfile) {
    return <p>User not found</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Service Ticket</CardTitle>
        <CardDescription>
          Track your service requests and complaints by adding the ticket number provided by the brand.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select a product</option>
                      {userProfile.products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.brand} - {product.name} ({product.model})
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Select the product for which you have a service request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ticketNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. SR12345678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the ticket number provided by the brand's customer service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Save Ticket
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex-col items-start border-t pt-4">
        <h4 className="text-sm font-semibold mb-2">Recent Tickets</h4>
        {userProfile.complaints.length > 0 ? (
          <div className="w-full space-y-2">
            {userProfile.complaints.map((complaint) => (
              <div key={complaint.id} className="text-sm p-2 border rounded">
                <div className="flex justify-between">
                  <span className="font-medium">{complaint.brandName} - {complaint.productName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    complaint.status === "Resolved" 
                      ? "bg-green-100 text-green-800" 
                      : complaint.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="flex justify-between mt-1 text-muted-foreground">
                  <span>#{complaint.ticketNumber}</span>
                  <span>{complaint.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No tickets found.</p>
        )}
      </CardFooter>
    </Card>
  );
}
