
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockProfile } from '@/data/mockProfiles';

interface CustomerAuthContextType {
  isLoggedIn: boolean;
  userProfile: MockProfile | null;
  login: (userData: Partial<MockProfile>) => void;
  logout: () => void;
  updateProfile: (userData: Partial<MockProfile>) => void;
  becomeHelpster: (brandName: string, expertise: string[]) => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<MockProfile | null>(null);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('customerUser');
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const login = (userData: Partial<MockProfile>) => {
    if (!userData.email) {
      console.error("Email is required for user login");
      return;
    }
    
    // Create a new unique ID for the user
    const newUserData: MockProfile = {
      id: `user-${Date.now()}`, // Generate a unique ID
      name: userData.name || 'User',
      email: userData.email,
      location: userData.location || 'Location not set',
      joinDate: new Date().toISOString(),
      isVerified: false, // User starts as not verified until OTP
      profilePicture: userData.profilePicture || "/placeholder.svg",
      products: userData.products || [],
      reviews: userData.reviews || [],
      complaints: userData.complaints || [],
      helpsterBrands: userData.helpsterBrands || [],
      isHelpster: userData.isHelpster || false,
      bio: userData.bio || '',
      phone: userData.phone || ''
    };
    
    setUserProfile(newUserData);
    setIsLoggedIn(true);
    localStorage.setItem('customerUser', JSON.stringify(newUserData));
  };

  // Logout function
  const logout = () => {
    setUserProfile(null);
    setIsLoggedIn(false);
    localStorage.removeItem('customerUser');
  };

  // Update profile function
  const updateProfile = (userData: Partial<MockProfile>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...userData };
      setUserProfile(updatedProfile);
      localStorage.setItem('customerUser', JSON.stringify(updatedProfile));
    }
  };

  // Become Helpster function
  const becomeHelpster = (brandName: string, expertise: string[]) => {
    if (userProfile) {
      const now = new Date().toISOString();
      const helpsterBrands = userProfile.helpsterBrands || [];
      
      // Only add if not already a helpster for this brand
      if (!helpsterBrands.some(brand => brand.brandName === brandName)) {
        const updatedHelpsterBrands = [
          ...helpsterBrands,
          {
            brandName,
            expertise,
            helpCount: 0,
            joinedDate: now
          }
        ];
        
        const updatedProfile = { 
          ...userProfile, 
          isHelpster: true,
          helpsterBrands: updatedHelpsterBrands
        };
        
        setUserProfile(updatedProfile);
        localStorage.setItem('customerUser', JSON.stringify(updatedProfile));
      }
    }
  };

  return (
    <CustomerAuthContext.Provider value={{ isLoggedIn, userProfile, login, logout, updateProfile, becomeHelpster }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}
