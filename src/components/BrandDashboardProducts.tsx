
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PackagePlus, Globe, Save, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  website: string;
}

export function BrandDashboardProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    website: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addProduct = () => {
    if (!newProduct.name) {
      toast({
        title: "Missing information",
        description: "Please enter a product name",
        variant: "destructive"
      });
      return;
    }

    const productId = Date.now().toString();
    setProducts(prev => [
      ...prev,
      {
        id: productId,
        name: newProduct.name,
        website: newProduct.website
      }
    ]);

    // Reset form
    setNewProduct({
      name: "",
      website: ""
    });

    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to your products.`
    });
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    
    toast({
      title: "Product removed",
      description: "The product has been removed from your list."
    });
  };

  const handleSave = () => {
    toast({
      title: "Products saved",
      description: "Your product changes have been saved."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Add and manage your brand's products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 p-4 border rounded-lg bg-muted/20">
              <h3 className="text-sm font-medium">Add New Product</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input 
                    id="productName" 
                    placeholder="Enter product name" 
                    value={newProduct.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productWebsite" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Product Website (Optional)
                  </Label>
                  <Input 
                    id="productWebsite" 
                    placeholder="https://example.com/product" 
                    value={newProduct.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={addProduct} className="w-full mt-2">
                <PackagePlus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {products.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Your Products</h3>
                <div className="space-y-2">
                  {products.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <div className="font-medium">{product.name}</div>
                        {product.website && (
                          <a 
                            href={product.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline flex items-center mt-1"
                          >
                            <Globe className="h-3 w-3 mr-1" /> {product.website}
                          </a>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button onClick={handleSave} className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No products added yet. Use the form above to add your first product.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
