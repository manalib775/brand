import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ServiceMetrics } from "@/components/metrics/ServiceMetrics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  BarChart3,
  MessageSquare,
  ExternalLink,
  Package,
  AlertTriangle,
  Shield,
  Clock,
  Search
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { CompanyTreeDiagram } from "@/components/CompanyTreeDiagram";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { SocialConnectButtons } from "@/components/social/SocialConnectButtons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const companyTreeData = {
  id: "tata-digital",
  name: "Tata Digital",
  logo: "/placeholder.svg",
  children: [
    {
      id: "infinity-retail",
      name: "Infinity Retail (Croma)",
      logo: "/placeholder.svg",
      children: [
        {
          id: "croma-retail",
          name: "Croma Retail",
          logo: "/placeholder.svg"
        },
        {
          id: "croma-enterprise",
          name: "Croma Enterprise Solutions",
          logo: "/placeholder.svg"
        }
      ]
    },
    {
      id: "bigbasket",
      name: "BigBasket",
      logo: "/placeholder.svg",
      children: [
        {
          id: "bb-daily",
          name: "BB Daily",
          logo: "/placeholder.svg"
        },
        {
          id: "bb-now",
          name: "BB Now",
          logo: "/placeholder.svg"
        }
      ]
    },
    {
      id: "tata-1mg",
      name: "Tata 1MG",
      logo: "/placeholder.svg",
      children: [
        {
          id: "1mg-pharmacy",
          name: "1MG Pharmacy",
          logo: "/placeholder.svg"
        },
        {
          id: "1mg-labs",
          name: "1MG Labs",
          logo: "/placeholder.svg"
        }
      ]
    },
    {
      id: "tata-cliq",
      name: "Tata CLiQ",
      logo: "/placeholder.svg"
    },
    {
      id: "tata-neu",
      name: "Tata NEU",
      logo: "/placeholder.svg"
    }
  ]
};

const brandData = {
  name: "Samsung",
  logo: "/placeholder.svg",
  parentCompany: "Samsung Group",
  founded: 1938,
  headquarters: "Seoul, South Korea",
  rating: 4.5,
  totalReviews: 15234,
  history: "Samsung was founded by Lee Byung-chul in 1938 as a trading company...",
  contact: {
    phone: "1-800-SAMSUNG",
    email: "support@samsung.com",
    website: "www.samsung.com",
    hours: "24/7",
  },
  social: {
    facebook: "facebook.com/samsung",
    twitter: "twitter.com/samsung",
    instagram: "instagram.com/samsung",
    linkedin: "linkedin.com/company/samsung",
  },
  activeProducts: [
    {
      id: "1",
      name: "Galaxy S24 Ultra",
      image: "/placeholder.svg",
      category: "Smartphones",
      productUrl: "https://samsung.com/galaxy-s24-ultra",
      price: "$1199",
    },
    {
      id: "2",
      name: "Neo QLED 8K Smart TV",
      image: "/placeholder.svg",
      category: "TVs",
      productUrl: "https://samsung.com/neo-qled-8k",
      price: "$2999",
    },
    {
      id: "3",
      name: "Bespoke French Door Refrigerator",
      image: "/placeholder.svg",
      category: "Home Appliances",
      productUrl: "https://samsung.com/bespoke-refrigerator",
      price: "$2799",
    },
    {
      id: "4",
      name: "Galaxy Book4 Pro",
      image: "/placeholder.svg",
      category: "Laptops",
      productUrl: "https://samsung.com/galaxy-book4-pro",
      price: "$1399",
    },
  ],
  metrics: {
    resolutionRate: 85,
    serviceSatisfaction: 92,
    warrantyClaimsData: [
      { month: "Oct 2023", approved: 120, rejected: 15 },
      { month: "Nov 2023", approved: 140, rejected: 20 },
      { month: "Dec 2023", approved: 160, rejected: 18 },
      { month: "Jan 2024", approved: 155, rejected: 12 },
      { month: "Feb 2024", approved: 170, rejected: 14 },
      { month: "Mar 2024", approved: 180, rejected: 16 },
    ],
    supportChannels: {
      call: 90,
      email: 85,
      chat: 95,
      store: 80,
    },
    escalationRating: 4,
    serviceCenter: {
      available: true,
      avgTurnaround: 3,
    },
    warrantyClaimSpeed: 85,
    returnSteps: 3,
    refundTime: 48,
    deliveryScore: 94,
    sentiment: "positive" as const,
    recallStatus: "safe" as const,
  },
  regulatoryBody: {
    name: "Department of Consumer Affairs",
    description: "The Department of Consumer Affairs is responsible for consumer protection and addressing grievances related to electronic products in India.",
    website: "https://consumeraffairs.nic.in/",
    contactEmail: "grievance-doca@gov.in",
    contactPhone: "1800-11-4000",
    portalUrl: "https://consumerhelpline.gov.in/",
    escalationTimeline: "Initial response within 7 days; Resolution within 30-45 days"
  },
  companyStructure: companyTreeData,
  supportHours: {
    monday: { open: "09:00", close: "18:00" },
    tuesday: { open: "09:00", close: "18:00" },
    wednesday: { open: "09:00", close: "18:00" },
    thursday: { open: "09:00", close: "18:00" },
    friday: { open: "09:00", close: "18:00" },
    saturday: { open: "10:00", close: "16:00" },
    sunday: { open: "Closed", close: "Closed" },
    holidays: ["2024-01-01", "2024-12-25"]
  }
};

const userOwnedProducts = [
  {
    id: "1",
    name: "Galaxy S24 Ultra",
    purchaseDate: "2024-01-15",
    warrantyEnd: "2026-01-15",
    image: "/placeholder.svg"
  }
];

const reviewTags = [
  "Customer Service",
  "Product Quality",
  "Value for Money",
  "Warranty Service",
  "Response Time",
  "Resolution Speed",
  "Support Staff",
  "Return Process"
];

export default function BrandDetails() {
  const { brandName } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [connectedSocials, setConnectedSocials] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleSocialConnect = (platform: string, accountId: string) => {
    setConnectedSocials({
      ...connectedSocials,
      [platform]: accountId
    });
  };

  const handleEmailSupport = () => {
    window.location.href = `mailto:${brandData.contact.email}?subject=Support Request for ${brandName || brandData.name}`;
  };

  const handleRegisterProduct = () => {
    navigate("/register", { state: { brandName: brandName || brandData.name } });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {userOwnedProducts.length > 0 && (
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-4 w-4" />
                Your Products from {brandName}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 p-2">
                  {userOwnedProducts.map((product) => (
                    <Card key={product.id} className="w-[150px]">
                      <CardHeader className="p-3 pb-2">
                        <div className="aspect-square relative rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Purchased: {product.purchaseDate}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Warranty until: {product.warrantyEnd}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{brandData.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Building2 className="h-4 w-4" />
                  {brandData.parentCompany}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{brandData.rating}</span>
                  <span className="text-muted-foreground">
                    ({brandData.totalReviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="metrics">
              <TabsList className="mb-4">
                <TabsTrigger value="metrics">Service Metrics</TabsTrigger>
                <TabsTrigger value="structure">Company Structure</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="connect">Connect</TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="space-y-6">
                <ServiceMetrics brandName={brandData.name} metrics={brandData.metrics} />
              </TabsContent>

              <TabsContent value="structure">
                <CompanyTreeDiagram companyData={brandData.companyStructure} />
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{brandData.history}</p>
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{brandData.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Button 
                          variant="link" 
                          className="p-0 h-auto"
                          onClick={handleEmailSupport}
                        >
                          {brandData.contact.email}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a 
                          href={`https://${brandData.contact.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center"
                        >
                          {brandData.contact.website}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Support Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Operating Hours</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monday:</span>
                            <span>{brandData.supportHours.monday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.monday.open} - ${brandData.supportHours.monday.close}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tuesday:</span>
                            <span>{brandData.supportHours.tuesday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.tuesday.open} - ${brandData.supportHours.tuesday.close}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wednesday:</span>
                            <span>{brandData.supportHours.wednesday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.wednesday.open} - ${brandData.supportHours.wednesday.close}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Thursday:</span>
                            <span>{brandData.supportHours.thursday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.thursday.open} - ${brandData.supportHours.thursday.close}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Friday:</span>
                            <span>{brandData.supportHours.friday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.friday.open} - ${brandData.supportHours.friday.close}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span>{brandData.supportHours.saturday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.saturday.open} - ${brandData.supportHours.saturday.close}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span>{brandData.supportHours.sunday.open === "Closed" ? "Closed" : 
                              `${brandData.supportHours.sunday.open} - ${brandData.supportHours.sunday.close}`}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Holiday Closures</h4>
                        {brandData.supportHours.holidays.length > 0 ? (
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {brandData.supportHours.holidays.map((date, index) => (
                              <li key={index}>{new Date(date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">No holiday closures listed</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connect">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connect with {brandName || brandData.name}</CardTitle>
                      <CardDescription>
                        Direct messaging with brand support representatives
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {showChat ? (
                        <ChatInterface 
                          brandName={brandName || brandData.name} 
                          brandLogo={brandData.logo}
                          onClose={() => setShowChat(false)}
                        />
                      ) : (
                        <div className="text-center py-6">
                          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Get help with your questions, product issues, or feedback.
                          </p>
                          <Button onClick={() => setShowChat(true)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Start Chat
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Media</CardTitle>
                      <CardDescription>
                        Connect your social media accounts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SocialConnectButtons 
                        onConnect={handleSocialConnect}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">
              <Star className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Review {brandName}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Review Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {reviewTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedTags(
                          selectedTags.includes(tag)
                            ? selectedTags.filter((t) => t !== tag)
                            : [...selectedTags, tag]
                        );
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Your Review</Label>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with this brand..."
                />
              </div>
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => setShowChat(true)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button className="w-full" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Products
                </Button>
                <Button className="w-full" variant="outline" onClick={handleRegisterProduct}>
                  <Package className="h-4 w-4 mr-2" />
                  Register Your Product
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { icon: Facebook, link: brandData.social.facebook },
                    { icon: Twitter, link: brandData.social.twitter },
                    { icon: Instagram, link: brandData.social.instagram },
                    { icon: Linkedin, link: brandData.social.linkedin },
                  ].map(({ icon: Icon, link }) => (
                    <Button
                      key={link}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open(`https://${link}`, '_blank')}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {link}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Featured Products</CardTitle>
            <CardDescription>Products and services from {brandName || brandData.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" onClick={handleRegisterProduct}>
                <Package className="h-4 w-4 mr-2" />
                Register Product
              </Button>
            </div>
            
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-2">
                {brandData.activeProducts.map((product) => (
                  <Card key={product.id} className="w-[130px] shrink-0">
                    <CardHeader className="p-2 pb-1">
                      <div className="aspect-square relative rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <h3 className="text-xs font-medium line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                      <p className="font-medium text-xs text-primary mt-1">{product.price}</p>
                      <Button 
                        variant="ghost" 
                        className="w-full text-xs mt-1 h-6 px-1"
                        onClick={() => window.open(product.productUrl, '_blank')}
                      >
                        View 
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Regulatory Authority
              </CardTitle>
              <CardDescription>Official government regulator for consumer complaints</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{brandData.regulatoryBody.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{brandData.regulatoryBody.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={brandData.regulatoryBody.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-sm"
                  >
                    {brandData.regulatoryBody.website.replace('https://', '')}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{brandData.regulatoryBody.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${brandData.regulatoryBody.contactEmail}`} 
                    className="hover:underline text-sm"
                  >
                    {brandData.regulatoryBody.contactEmail}
                  </a>
                </div>
              </div>
              
              <div>
                <Badge variant="outline" className="mt-2">
                  {brandData.regulatoryBody.escalationTimeline}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button 
              className="w-full"
              onClick={() => window.open(brandData.regulatoryBody.portalUrl, '_blank')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Submit a Complaint on Government Portal
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
