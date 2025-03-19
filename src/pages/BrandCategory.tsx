import { useParams, useNavigate } from "react-router-dom";
import { BrandCard } from "@/components/BrandCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Building2, Globe, MapPin, Phone, Mail, AlertTriangle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";

const categories = [
  { 
    id: "electronics",
    name: "Electronics & Mobile",
    govtRegulator: {
      name: "Department of Consumer Affairs",
      website: "https://consumeraffairs.nic.in/",
      description: "The Department of Consumer Affairs is responsible for consumer protection and addressing grievances related to electronic products in India.",
      contactEmail: "grievance-doca@gov.in",
      contactPhone: "1800-11-4000",
      escalationTimeline: "Initial response within 7 days; Resolution within 30-45 days"
    },
    companies: [
      { 
        name: "Samsung Electronics",
        founded: 1969,
        headquarters: "Seoul, South Korea",
        logo: "/placeholder.svg",
        website: "https://www.samsung.com/in/",
        subsidiaries: [
          "Samsung India Electronics Pvt Ltd",
          "Samsung R&D Institute India-Bangalore",
          "Samsung Data Systems India"
        ],
        divisions: [
          "Mobile Communications",
          "Consumer Electronics",
          "IT & Mobile Communications"
        ],
        rating: 4.5,
        phone: "+1-800-726-7864",
        email: "support@samsung.com",
        supportHours: "Mon-Sat: 9:00 AM - 6:00 PM"
      },
      { 
        name: "Apple Inc.",
        founded: 1976,
        headquarters: "Cupertino, California, USA",
        logo: "/placeholder.svg",
        website: "https://www.apple.com/in/",
        subsidiaries: [
          "Apple India Private Limited",
          "Apple Services India Private Limited"
        ],
        divisions: [
          "iPhone",
          "Mac",
          "iPad",
          "Wearables, Home and Accessories",
          "Services"
        ],
        rating: 4.8,
        phone: "+1-800-692-7753",
        email: "support@apple.com",
        supportHours: "Mon-Sun: 7:00 AM - 9:00 PM"
      },
      { 
        name: "Xiaomi Corporation",
        founded: 2010,
        headquarters: "Beijing, China",
        logo: "/placeholder.svg",
        website: "https://www.mi.com/in/",
        subsidiaries: [
          "Xiaomi Technology India Private Limited",
          "Xiaomi Home India"
        ],
        divisions: [
          "Smartphones",
          "Smart Home",
          "Lifestyle Products"
        ],
        rating: 4.2,
        phone: "1800-103-6286",
        email: "service.in@xiaomi.com",
        supportHours: "Mon-Sat: 9:00 AM - 9:00 PM"
      },
      { 
        name: "LG Electronics",
        founded: 1958,
        headquarters: "Seoul, South Korea",
        logo: "/placeholder.svg",
        website: "https://www.lg.com/in",
        subsidiaries: [
          "LG Electronics India Pvt Ltd",
          "LG Soft India"
        ],
        divisions: [
          "Home Entertainment",
          "Mobile Communications",
          "Home Appliance & Air Solutions",
          "Vehicle Components"
        ],
        rating: 4.3,
        phone: "1800-315-9999",
        email: "customercare@lgindia.com",
        supportHours: "Mon-Sat: 9:00 AM - 6:00 PM"
      }
    ]
  },
  {
    id: "airlines",
    name: "Airlines",
    govtRegulator: {
      name: "Directorate General of Civil Aviation (DGCA)",
      website: "https://dgca.gov.in/",
      description: "DGCA is the regulatory body for civil aviation in India, handling passenger grievances through the Air Sewa portal.",
      contactEmail: "grievance@dgca.nic.in",
      contactPhone: "011-24622495",
      portalUrl: "https://airsewa.gov.in",
      escalationTimeline: "Initial response within 3 days; Resolution within 30 days"
    },
    companies: [
      {
        name: "Air India",
        founded: 1932,
        headquarters: "New Delhi, India",
        logo: "/placeholder.svg",
        website: "https://www.airindia.com/",
        subsidiaries: [
          "Air India Express",
          "Alliance Air",
          "Air India SATS"
        ],
        divisions: [
          "Domestic Operations",
          "International Operations",
          "Cargo Services"
        ],
        rating: 3.8,
        phone: "1860 233 1407",
        email: "contactus@airindia.in",
        govtPortal: "https://airsewa.gov.in",
        supportHours: "24/7"
      },
      {
        name: "IndiGo",
        founded: 2006,
        headquarters: "Gurugram, India",
        logo: "/placeholder.svg",
        website: "https://www.goindigo.in/",
        subsidiaries: [],
        divisions: [
          "Domestic Operations",
          "International Operations",
          "Cargo Services",
          "IndiGo Catering"
        ],
        rating: 4.2,
        phone: "0124-6173838",
        email: "customer.relations@goindigo.in",
        govtPortal: "https://airsewa.gov.in",
        supportHours: "24/7"
      },
      {
        name: "SpiceJet",
        founded: 2005,
        headquarters: "Gurugram, India",
        logo: "/placeholder.svg",
        website: "https://www.spicejet.com/",
        subsidiaries: [
          "SpiceXpress (Cargo division)"
        ],
        divisions: [
          "Domestic Operations",
          "International Operations",
          "Cargo Services"
        ],
        rating: 3.7,
        phone: "0124-4983410",
        email: "custrelations@spicejet.com",
        govtPortal: "https://airsewa.gov.in",
        supportHours: "9:00 AM - 9:00 PM"
      }
    ]
  },
  {
    id: "financial_services",
    name: "Financial Services",
    govtRegulator: {
      name: "Reserve Bank of India (RBI)",
      website: "https://www.rbi.org.in/",
      description: "RBI is the central banking institution of India, regulating all banking and financial services with an Ombudsman scheme for consumer grievances.",
      contactEmail: "crpc@rbi.org.in",
      contactPhone: "14440",
      portalUrl: "https://cms.rbi.org.in",
      escalationTimeline: "Initial response within 10 days; Resolution within 30 days; Appeal to Ombudsman after 30 days"
    },
    companies: [
      {
        name: "HDFC Bank",
        founded: 1994,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.hdfcbank.com/",
        subsidiaries: [
          "HDFC Securities",
          "HDB Financial Services"
        ],
        divisions: [
          "Retail Banking",
          "Wholesale Banking",
          "Treasury",
          "Digital Banking"
        ],
        rating: 4.2,
        phone: "1800 202 6161",
        email: "support@hdfcbank.com",
        govtPortal: "https://cms.rbi.org.in",
        supportHours: "24/7"
      },
      {
        name: "State Bank of India",
        founded: 1955,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.onlinesbi.com/",
        subsidiaries: [
          "SBI Cards",
          "SBI Life Insurance",
          "SBI Mutual Fund",
          "SBI General Insurance"
        ],
        divisions: [
          "Personal Banking",
          "NRI Banking",
          "Corporate Banking",
          "International Banking"
        ],
        rating: 4.0,
        phone: "1800 1234",
        email: "contactcentre@sbi.co.in",
        govtPortal: "https://cms.rbi.org.in",
        supportHours: "24/7"
      },
      {
        name: "ICICI Bank",
        founded: 1994,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.icicibank.com/",
        subsidiaries: [
          "ICICI Prudential Life Insurance",
          "ICICI Lombard General Insurance",
          "ICICI Securities",
          "ICICI Venture"
        ],
        divisions: [
          "Retail Banking",
          "Corporate Banking",
          "Private Banking",
          "Digital Banking"
        ],
        rating: 4.1,
        phone: "1800 1080",
        email: "customer.care@icicibank.com",
        govtPortal: "https://cms.rbi.org.in",
        supportHours: "24/7"
      }
    ]
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    govtRegulator: {
      name: "Telecom Regulatory Authority of India (TRAI)",
      website: "https://www.trai.gov.in/",
      description: "TRAI is the regulatory body for the telecommunications industry in India, handling consumer complaints and service quality issues.",
      contactEmail: "cp@trai.gov.in",
      contactPhone: "1800-11-2008",
      portalUrl: "https://trai.gov.in/consumer-info/complaint-redressal-mechanism",
      escalationTimeline: "Initial response within 7 days; Resolution within 30 days"
    },
    companies: [
      {
        name: "Reliance Jio",
        founded: 2007,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.jio.com/",
        subsidiaries: [
          "Jio Platforms Limited",
          "Reliance Jio Infocomm Limited"
        ],
        divisions: [
          "Mobile Services",
          "JioFiber",
          "Digital Services",
          "Enterprise Solutions"
        ],
        rating: 4.3,
        phone: "1800 88 99 99",
        email: "care@jio.com",
        govtPortal: "https://trai.gov.in/consumer-info/complaint-redressal-mechanism",
        supportHours: "24/7"
      },
      {
        name: "Bharti Airtel",
        founded: 1995,
        headquarters: "New Delhi, India",
        logo: "/placeholder.svg",
        website: "https://www.airtel.in/",
        subsidiaries: [
          "Bharti Telemedia",
          "Bharti Infratel",
          "Airtel Payments Bank"
        ],
        divisions: [
          "Mobile Services",
          "Airtel Xstream Fiber",
          "Airtel Business",
          "Digital TV"
        ],
        rating: 4.0,
        phone: "121",
        email: "121@in.airtel.com",
        govtPortal: "https://trai.gov.in/consumer-info/complaint-redressal-mechanism",
        supportHours: "24/7"
      },
      {
        name: "Vodafone Idea",
        founded: 2018,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.myvi.in/",
        subsidiaries: [
          "Vodafone Idea Business Services",
          "You Broadband"
        ],
        divisions: [
          "Consumer Mobile",
          "Enterprise Services",
          "Digital Solutions"
        ],
        rating: 3.5,
        phone: "199",
        email: "customercare@vodafoneidea.com",
        govtPortal: "https://trai.gov.in/consumer-info/complaint-redressal-mechanism",
        supportHours: "9:00 AM - 9:00 PM"
      }
    ]
  },
  {
    id: "insurance",
    name: "Insurance",
    govtRegulator: {
      name: "Insurance Regulatory and Development Authority of India (IRDAI)",
      website: "https://www.irdai.gov.in/",
      description: "IRDAI is the regulatory authority for insurance and reinsurance industry in India, handling consumer grievances and policyholder protection.",
      contactEmail: "grievance@irdai.gov.in",
      contactPhone: "1800 4254 732",
      portalUrl: "https://igms.irda.gov.in/",
      escalationTimeline: "Initial response within 15 days; Resolution within 45 days"
    },
    companies: [
      {
        name: "LIC of India",
        founded: 1956,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.licindia.in/",
        subsidiaries: [
          "LIC Housing Finance",
          "LIC Pension Fund",
          "LIC Cards Services"
        ],
        divisions: [
          "Life Insurance",
          "Pension Plans",
          "Group Insurance",
          "Health Insurance"
        ],
        rating: 4.0,
        phone: "1800 258 9966",
        email: "co_crmgrv@licindia.com",
        govtPortal: "https://igms.irda.gov.in/",
        supportHours: "10:00 AM - 6:00 PM (Mon-Fri)"
      },
      {
        name: "HDFC Life",
        founded: 2000,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.hdfclife.com/",
        subsidiaries: [],
        divisions: [
          "Term Insurance",
          "ULIPs",
          "Pension Plans",
          "Health Insurance"
        ],
        rating: 4.2,
        phone: "1860 267 9999",
        email: "service@hdfclife.com",
        govtPortal: "https://igms.irda.gov.in/",
        supportHours: "9:00 AM - 9:00 PM"
      },
      {
        name: "ICICI Lombard",
        founded: 2001,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.icicilombard.com/",
        subsidiaries: [],
        divisions: [
          "Motor Insurance",
          "Health Insurance",
          "Travel Insurance",
          "Home Insurance"
        ],
        rating: 4.1,
        phone: "1800 2666",
        email: "customersupport@icicilombard.com",
        govtPortal: "https://igms.irda.gov.in/",
        supportHours: "8:00 AM - 8:00 PM"
      }
    ]
  },
  {
    id: "e_commerce",
    name: "E-Commerce",
    govtRegulator: {
      name: "Department of Consumer Affairs",
      website: "https://consumeraffairs.nic.in/",
      description: "The Department of Consumer Affairs handles e-commerce related consumer complaints through the National Consumer Helpline.",
      contactEmail: "grievance-doca@gov.in",
      contactPhone: "1800-11-4000",
      portalUrl: "https://consumerhelpline.gov.in/",
      escalationTimeline: "Initial response within 7 days; Resolution within 30 days"
    },
    companies: [
      {
        name: "Amazon India",
        founded: 2013,
        headquarters: "Bangalore, India (Indian HQ)",
        logo: "/placeholder.svg",
        website: "https://www.amazon.in/",
        subsidiaries: [
          "Amazon Seller Services Pvt. Ltd.",
          "Amazon Transportation Services"
        ],
        divisions: [
          "Retail",
          "Amazon Prime",
          "Amazon Pay",
          "Amazon Web Services"
        ],
        rating: 4.5,
        phone: "1800 3000 9009",
        email: "cs-reply@amazon.in",
        govtPortal: "https://consumerhelpline.gov.in/",
        supportHours: "24/7"
      },
      {
        name: "Flipkart",
        founded: 2007,
        headquarters: "Bangalore, India",
        logo: "/placeholder.svg",
        website: "https://www.flipkart.com/",
        subsidiaries: [
          "Myntra",
          "PhonePe",
          "Cleartrip"
        ],
        divisions: [
          "Flipkart Wholesale",
          "Flipkart Health+",
          "Flipkart Grocery"
        ],
        rating: 4.3,
        phone: "1800 208 9898",
        email: "cs@flipkart.com",
        govtPortal: "https://consumerhelpline.gov.in/",
        supportHours: "24/7"
      },
      {
        name: "Reliance Retail",
        founded: 2006,
        headquarters: "Mumbai, India",
        logo: "/placeholder.svg",
        website: "https://www.relianceretail.com/",
        subsidiaries: [
          "AJIO",
          "JioMart",
          "Reliance Digital"
        ],
        divisions: [
          "Fashion & Lifestyle",
          "Grocery",
          "Electronics",
          "Jewellery"
        ],
        rating: 4.0,
        phone: "1800 889 9999",
        email: "customercare@relianceretail.com",
        govtPortal: "https://consumerhelpline.gov.in/",
        supportHours: "10:00 AM - 7:00 PM"
      }
    ]
  }
];

export default function BrandCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
  
  const category = categories.find(c => c.id === categoryId);

  useEffect(() => {
    if (category) {
      if (searchQuery.trim() === "") {
        setFilteredCompanies(category.companies);
      } else {
        const query = searchQuery.toLowerCase();
        const results = category.companies.filter(company => {
          // Search in company name
          if (company.name.toLowerCase().includes(query)) return true;
          
          // Search in subsidiaries
          if (company.subsidiaries?.some((sub: string) => 
            sub.toLowerCase().includes(query)
          )) return true;
          
          // Search in divisions
          if (company.divisions?.some((div: string) => 
            div.toLowerCase().includes(query)
          )) return true;
          
          return false;
        });
        setFilteredCompanies(results);
      }
    }
  }, [category, searchQuery]);

  if (!category) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>

        <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground mb-6">
          Browse all companies and their subsidiaries in this category
        </p>

        {category.govtRegulator && (
          <div className="mb-6 bg-accent/30 rounded-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Regulatory Authority
                </h2>
                <h3 className="font-medium">{category.govtRegulator.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">{category.govtRegulator.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <a href={category.govtRegulator.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {category.govtRegulator.website.replace('https://', '')}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{category.govtRegulator.contactPhone}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <a href={`mailto:${category.govtRegulator.contactEmail}`} className="hover:underline">
                      {category.govtRegulator.contactEmail}
                    </a>
                  </div>
                  
                  {category.govtRegulator.escalationTimeline && (
                    <div className="md:col-span-2 mt-2">
                      <Badge variant="outline" className="font-normal">
                        Escalation Timeline: {category.govtRegulator.escalationTimeline}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              
              {category.govtRegulator.portalUrl && (
                <Button
                  className="shrink-0"
                  onClick={() => window.open(category.govtRegulator.portalUrl, '_blank')}
                >
                  Consumer Portal
                  <Globe className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="mb-6 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search companies in this category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <BrandCard
              key={company.name}
              brand={{
                name: company.name,
                logo: company.logo || "/placeholder.svg",
                description: `Founded: ${company.founded}${company.headquarters ? ` • HQ: ${company.headquarters}` : ''}`,
                subsidiaries: company.subsidiaries?.map((name: string) => ({
                  name,
                  logo: "/placeholder.svg",
                  description: `Subsidiary of ${company.name}`
                }))
              }}
            />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No companies found matching your search criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
