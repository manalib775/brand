
export interface HelpsterBrand {
  brandName: string;
  expertise: string[];
  helpCount: number;
  joinedDate: string;
}

export interface MockProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  joinDate: string;
  isVerified: boolean;
  profilePicture: string;
  bio?: string;
  phone?: string;
  isHelpster?: boolean;
  helpsterBrands?: HelpsterBrand[];
  products: Array<{
    id: string;
    name: string;
    brand: string;
    model: string;
    serialNumber: string;
    purchaseDate: string;
    warrantyEnd: string;
    location: string;
  }>;
  reviews: Array<{
    id: string;
    brandName: string;
    productName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  complaints: Array<{
    id: string;
    brandName: string;
    productName: string;
    ticketNumber: string;
    status: string;
    description: string;
    date: string;
    resolution: string;
  }>;
}

export const mockProfiles: MockProfile[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    location: "Mumbai, Maharashtra",
    joinDate: "2023-01-15",
    isVerified: true,
    profilePicture: "/placeholder.svg",
    isHelpster: true,
    helpsterBrands: [
      {
        brandName: "Samsung",
        expertise: ["Mobile Phones", "Smart TVs"],
        helpCount: 45,
        joinedDate: "2023-02-01"
      },
      {
        brandName: "LG",
        expertise: ["Home Appliances"],
        helpCount: 23,
        joinedDate: "2023-03-15"
      }
    ],
    products: [
      {
        id: "p1",
        name: "Galaxy S23 Ultra",
        brand: "Samsung",
        model: "SM-S918B",
        serialNumber: "RZ8G7B2X9V4M",
        purchaseDate: "2023-06-15",
        warrantyEnd: "2024-06-15",
        location: "Mumbai",
      },
      {
        id: "p2",
        name: "Smart TV",
        brand: "LG",
        model: "OLED65C3",
        serialNumber: "LT5K9H3N7P2W",
        purchaseDate: "2023-08-20",
        warrantyEnd: "2024-08-20",
        location: "Mumbai",
      }
    ],
    reviews: [
      {
        id: "r1",
        brandName: "Samsung",
        productName: "Galaxy S23 Ultra",
        rating: 4,
        comment: "Great phone but battery life could be better",
        date: "2023-09-15",
      },
      {
        id: "r2",
        brandName: "LG",
        productName: "Smart TV",
        rating: 5,
        comment: "Excellent picture quality and smart features",
        date: "2023-10-10",
      }
    ],
    complaints: [
      {
        id: "c1",
        brandName: "Samsung",
        productName: "Galaxy S23 Ultra",
        ticketNumber: "SAM2023091501",
        status: "Resolved",
        description: "Screen flickering issue",
        date: "2023-09-15",
        resolution: "Software update provided fixed the issue",
      }
    ]
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    location: "Bangalore, Karnataka",
    joinDate: "2023-03-20",
    isVerified: true,
    profilePicture: "/placeholder.svg",
    isHelpster: true,
    helpsterBrands: [
      {
        brandName: "Apple",
        expertise: ["MacBooks", "iPhones", "iPads"],
        helpCount: 67,
        joinedDate: "2023-04-01"
      }
    ],
    products: [
      {
        id: "p3",
        name: "MacBook Pro",
        brand: "Apple",
        model: "A2338",
        serialNumber: "C02G7B2XPGLY",
        purchaseDate: "2023-04-10",
        warrantyEnd: "2024-04-10",
        location: "Bangalore",
      }
    ],
    reviews: [
      {
        id: "r3",
        brandName: "Apple",
        productName: "MacBook Pro",
        rating: 5,
        comment: "Perfect for work and entertainment",
        date: "2023-05-15",
      }
    ],
    complaints: []
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    location: "Delhi, NCR",
    joinDate: "2023-02-01",
    isVerified: true,
    profilePicture: "/placeholder.svg",
    products: [
      {
        id: "p4",
        name: "Split AC",
        brand: "Daikin",
        model: "FTHT35TV16",
        serialNumber: "DK4J2M8L5X3P",
        purchaseDate: "2023-03-15",
        warrantyEnd: "2028-03-15",
        location: "Delhi",
      },
      {
        id: "p5",
        name: "Washing Machine",
        brand: "IFB",
        model: "Senator WSS",
        serialNumber: "IF7H2N9K4M1L",
        purchaseDate: "2023-05-20",
        warrantyEnd: "2028-05-20",
        location: "Delhi",
      }
    ],
    reviews: [
      {
        id: "r4",
        brandName: "Daikin",
        productName: "Split AC",
        rating: 4,
        comment: "Good cooling but high electricity consumption",
        date: "2023-06-30",
      }
    ],
    complaints: [
      {
        id: "c2",
        brandName: "IFB",
        productName: "Washing Machine",
        ticketNumber: "IFB2023072001",
        status: "In Progress",
        description: "Unusual noise during spin cycle",
        date: "2023-07-20",
        resolution: "Technician visit scheduled",
      }
    ]
  }
];

export type MockProduct = MockProfile['products'][0];
export type MockReview = MockProfile['reviews'][0];
export type MockComplaint = MockProfile['complaints'][0];
