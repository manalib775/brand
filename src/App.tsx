
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ClerkProvider } from '@clerk/clerk-react';
import { CustomerAuthProvider } from '@/contexts/CustomerAuthContext';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Index from './pages/Index';
import BrandDetails from './pages/BrandDetails';
import BrandDashboard from './pages/BrandDashboard';
import SuperAdmin from './pages/SuperAdmin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProductRegistration from './pages/ProductRegistration';
import BrandCategory from './pages/BrandCategory';
import BrandRegistration from './pages/BrandRegistration';
import FAQ from './pages/FAQ';
import OtpVerification from './pages/OtpVerification';
import './App.css';

// Use environment variables from Vite
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <CustomerAuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/brand/:brandName" element={<BrandDetails />} />
                  <Route path="/brand-category/:categoryId" element={<BrandCategory />} />
                  <Route path="/brand-category" element={<BrandCategory />} />
                  <Route path="/brand-dashboard" element={<BrandDashboard />} />
                  <Route path="/brand-registration" element={<BrandRegistration />} />
                  <Route path="/super-admin" element={<SuperAdmin />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/register" element={<ProductRegistration />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/otp-verification" element={<OtpVerification />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster />
          </Router>
        </CustomerAuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
