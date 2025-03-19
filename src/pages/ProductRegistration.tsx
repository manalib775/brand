
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { useLocation } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Camera, Check, ChevronsUpDown, FileUp, CalendarIcon, Info, Search, ScanLine } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { mockProfiles } from "@/data/mockProfiles";
import { ProductRegistrationBenefits } from "@/components/ProductRegistrationBenefits";
import { QRBarcodeScanner } from "@/components/QRBarcodeScanner";

const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  product: z.string().min(1, "Product is required"),
  model: z.string().min(1, "Model number is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  purchaseDate: z.date({
    required_error: "Purchase date is required",
  }),
  purchaseLocation: z.string().min(1, "Purchase location is required"),
  purchasePrice: z.string().optional(),
  hasReceipt: z.boolean().default(false),
  receiptImage: z.any().optional(),
  productImage: z.any().optional(),
  location: z.string().min(1, "Location is required"),
  warrantyPeriod: z.string().min(1, "Warranty period is required"),
});

const mockBrands = [
  "Samsung", "Apple", "Sony", "LG Electronics", "Dell", "HP", "Lenovo", 
  "Xiaomi", "OnePlus", "Bosch", "Whirlpool", "Haier", "Philips", "Panasonic", 
  "Canon", "Nikon", "Asus", "Acer", "Microsoft", "Epson"
];

export default function ProductRegistration() {
  const location = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(mockBrands);
  const [showBrandSearch, setShowBrandSearch] = useState(true);
  const [brandProducts, setBrandProducts] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      product: "",
      model: "",
      serialNumber: "",
      purchaseLocation: "",
      purchasePrice: "",
      hasReceipt: false,
      location: mockProfiles[0]?.location || "",
      warrantyPeriod: "1 year",
    },
  });

  useEffect(() => {
    if (location.state?.brandName) {
      setSelectedBrand(location.state.brandName);
      form.setValue("brand", location.state.brandName);
      setShowBrandSearch(false);
      setStep(2);
      
      const mockProducts = [
        "Galaxy S24 Ultra",
        "Galaxy Z Fold 5",
        "Neo QLED 8K Smart TV",
        "Bespoke Refrigerator",
        "Galaxy Book4 Pro",
        "Odyssey Gaming Monitor",
        "Galaxy Buds Pro",
        "Galaxy Watch6"
      ];
      
      setBrandProducts(mockProducts);
    }
  }, [location.state?.brandName, form]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBrands(mockBrands);
    } else {
      const filtered = mockBrands.filter(brand =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [searchTerm]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    toast({
      title: "Product registered successfully!",
      description: `Your ${values.product} has been registered for warranty until ${format(values.purchaseDate, 'PPP')}`,
    });
  };

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand);
    form.setValue("brand", brand);
    setShowBrandSearch(false);
    setStep(2);
    
    setTimeout(() => {
      let products;
      if (brand === "Samsung") {
        products = [
          "Galaxy S24 Ultra",
          "Galaxy Z Fold 5",
          "Neo QLED 8K Smart TV",
          "Bespoke Refrigerator",
          "Galaxy Book4 Pro",
          "Odyssey Gaming Monitor",
          "Galaxy Buds Pro",
          "Galaxy Watch6"
        ];
      } else if (brand === "Apple") {
        products = [
          "iPhone 15 Pro Max",
          "MacBook Pro 16",
          "iPad Pro",
          "Apple Watch Series 9",
          "AirPods Pro",
          "Mac Studio",
          "Mac Mini M2",
          "Apple TV 4K"
        ];
      } else {
        products = [
          "Product 1",
          "Product 2",
          "Product 3",
          "Product 4",
          "Product 5"
        ];
      }
      
      setBrandProducts(products);
    }, 500);
  };

  const handleBack = () => {
    if (step === 2) {
      setShowBrandSearch(true);
      setStep(1);
    }
  };

  const handleScanComplete = (serialNumber: string) => {
    form.setValue("serialNumber", serialNumber);
    toast({
      title: "Serial number detected",
      description: `${serialNumber} has been added to the form.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-5xl mx-auto px-4 py-8 page-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Product Registration</CardTitle>
                <CardDescription>
                  Register your product to activate warranty and receive support
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showBrandSearch ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="brand-search">Search for a brand</Label>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                          id="brand-search"
                          placeholder="Search brands..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button type="submit">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Select a brand</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {filteredBrands.map((brand) => (
                          <Button
                            key={brand}
                            variant="outline"
                            className="justify-start h-auto py-3"
                            onClick={() => handleSelectBrand(brand)}
                          >
                            <div className="flex items-center">
                              <div className="w-6 h-6 mr-2 bg-gray-100 rounded-full flex items-center justify-center">
                                {brand.charAt(0)}
                              </div>
                              <span>{brand}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        <h2 className="text-lg font-medium">Registering product for {selectedBrand}</h2>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="product"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {brandProducts.map((product) => (
                                  <SelectItem key={product} value={product}>{product}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the product you want to register
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Model Number</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., SM-G998B" {...field} />
                              </FormControl>
                              <FormDescription>
                                Found on the product or packaging
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="serialNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Serial Number</FormLabel>
                                <FormControl>
                                  <div className="space-y-2">
                                    <Input placeholder="e.g., RZ8G7B2X9V4M" {...field} />
                                    <QRBarcodeScanner onScanComplete={handleScanComplete} />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Enter manually or scan from product
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="purchaseDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Purchase Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="warrantyPeriod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Warranty Period</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select warranty period" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1 year">1 year</SelectItem>
                                  <SelectItem value="2 years">2 years</SelectItem>
                                  <SelectItem value="3 years">3 years</SelectItem>
                                  <SelectItem value="5 years">5 years</SelectItem>
                                  <SelectItem value="Lifetime">Lifetime</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="purchaseLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Purchase Location</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Amazon, Best Buy" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="purchasePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Purchase Price (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., $1,199.99" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Home Office, Living Room" {...field} />
                            </FormControl>
                            <FormDescription>
                              Where is this product typically used or stored?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="mb-2 block">Upload Receipt (Optional)</Label>
                            <div className="border-2 border-dashed rounded-md py-10 px-6 text-center">
                              <FileUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <div className="mt-2">
                                <Button variant="ghost" size="sm">
                                  Select File
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Support for JPG, PNG, PDF up to 5MB
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="mb-2 block">Upload Product Image (Optional)</Label>
                            <div className="border-2 border-dashed rounded-md py-10 px-6 text-center">
                              <Camera className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <div className="mt-2">
                                <Button variant="ghost" size="sm">
                                  Take Photo or Select File
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Support for JPG, PNG up to 5MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">Register Product</Button>
                    </form>
                  </Form>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 border-t p-6">
                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Registering your product activates your warranty and ensures you'll receive important
                    updates, recall notices, and support information.
                  </p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" size="sm" className="px-0">
                      Why should I register my product?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Benefits of Product Registration</DialogTitle>
                      <DialogDescription>
                        Learn why registering your products is important
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Warranty Activation</h4>
                        <p className="text-sm text-muted-foreground">
                          Many manufacturers require product registration to validate and activate your warranty coverage.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Safety Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive critical safety notices and recall information directly from the manufacturer.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Simplified Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Access faster customer support with all your product details already on file.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Software Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Get notifications about firmware and software updates to keep your product operating at its best.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="w-full">
                        <Check className="h-4 w-4 mr-2" />
                        Got it
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <ProductRegistrationBenefits />
          </div>
        </div>
      </main>
    </div>
  );
}
