
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star, HelpCircle, Check } from "lucide-react";

export function HelpstarRegistration() {
  const { toast } = useToast();
  const [expertise, setExpertise] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [agreement, setAgreement] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const mockBrands = [
    "Samsung", "Apple", "Sony", "LG Electronics", "Dell", "HP", "Lenovo", 
    "Xiaomi", "OnePlus", "Bosch", "Whirlpool", "Haier", "Philips", "Panasonic"
  ];

  const expertiseOptions = [
    { id: "mobile", label: "Mobile Phones" },
    { id: "computer", label: "Computers & Laptops" },
    { id: "tv", label: "TVs & Home Entertainment" },
    { id: "appliances", label: "Home Appliances" },
    { id: "audio", label: "Audio Equipment" },
    { id: "wearables", label: "Wearable Devices" },
    { id: "cameras", label: "Cameras & Photography" },
    { id: "gaming", label: "Gaming Consoles" }
  ];

  const handleExpertiseChange = (checked: boolean | "indeterminate", id: string) => {
    if (checked) {
      setExpertise(prev => [...prev, id]);
    } else {
      setExpertise(prev => prev.filter(item => item !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBrand || expertise.length === 0 || !experience || !description || !agreement) {
      toast({
        title: "Missing information",
        description: "Please complete all fields and accept the agreement.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit Helpstar application
    setSubmitted(true);
    toast({
      title: "HelpStar Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" /> HelpStar Application
          </CardTitle>
          <CardDescription>Thank you for applying to the HelpStar program</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="rounded-full bg-green-100 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Application Received!</h3>
          <p className="text-muted-foreground mb-4">
            Your application to become a HelpStar for {selectedBrand} is under review.
            We'll notify you once your application is approved.
          </p>
          <div className="max-w-md mx-auto bg-muted p-4 rounded-lg text-sm text-left">
            <p className="font-medium mb-2">What happens next?</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Our team reviews your application</li>
              <li>A brand representative may contact you for verification</li>
              <li>Upon approval, you'll receive a HelpStar badge on your profile</li>
              <li>You can start helping others with their {selectedBrand} products!</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" /> HelpStar Program Application
        </CardTitle>
        <CardDescription>Help other customers and earn recognition as a product expert</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brand">Select Brand</Label>
            <Select onValueChange={setSelectedBrand} required>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Choose a brand you want to help with" />
              </SelectTrigger>
              <SelectContent>
                {mockBrands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Areas of Expertise</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {expertiseOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={option.id} 
                    checked={expertise.includes(option.id)}
                    onCheckedChange={(checked) => handleExpertiseChange(checked, option.id)}
                  />
                  <Label 
                    htmlFor={option.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select onValueChange={setExperience} required>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                <SelectItem value="expert">Expert (5+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Why do you want to be a HelpStar?</Label>
            <Textarea 
              id="description" 
              placeholder="Tell us why you're interested and how you can help others..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="agreement" 
              checked={agreement}
              onCheckedChange={(checked) => setAgreement(checked === true)}
            />
            <Label 
              htmlFor="agreement"
              className="text-sm font-normal leading-tight"
            >
              I agree to help other customers with their questions and issues, to the best of my ability,
              and to follow the community guidelines.
            </Label>
          </div>
          
          <Button type="submit" className="w-full">
            <Star className="h-4 w-4 mr-2" />
            Apply to be a HelpStar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-muted/20 border-t flex-col items-start">
        <div className="flex items-start space-x-2 text-sm">
          <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
          <div>
            <p className="font-medium">What is the HelpStar program?</p>
            <p className="text-muted-foreground">
              HelpStars are community volunteers who assist other customers with product
              questions and troubleshooting. As a HelpStar, you'll receive a special badge
              on your profile and recognition from the brand.
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
