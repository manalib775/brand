
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface SocialConnectButtonsProps {
  linkedAccount?: string;
  onConnect?: (platform: string, accountId: string) => void;
}

export function SocialConnectButtons({ linkedAccount, onConnect }: SocialConnectButtonsProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = (platform: string) => {
    setIsConnecting(true);
    setSelectedPlatform(platform);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      
      // Simulate successful connection
      if (onConnect) {
        const mockAccountId = `user_${Math.random().toString(36).substr(2, 9)}`;
        onConnect(platform, mockAccountId);
      }
      
      toast({
        title: "Connected Successfully",
        description: `Your ${platform} account has been connected.`,
      });
    }, 1500);
  };

  const getButtonForPlatform = (platform: string) => {
    const isConnected = linkedAccount && platform.toLowerCase() === linkedAccount.toLowerCase();
    
    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <Button 
            variant={isConnected ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleConnect('facebook')}
            disabled={isConnecting && selectedPlatform === 'facebook'}
          >
            <Facebook className="h-4 w-4 mr-2" />
            {isConnected ? "Connected to Facebook" : "Connect Facebook"}
          </Button>
        );
      case 'twitter':
        return (
          <Button 
            variant={isConnected ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleConnect('twitter')}
            disabled={isConnecting && selectedPlatform === 'twitter'}
          >
            <Twitter className="h-4 w-4 mr-2" />
            {isConnected ? "Connected to Twitter" : "Connect Twitter"}
          </Button>
        );
      case 'instagram':
        return (
          <Button 
            variant={isConnected ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleConnect('instagram')}
            disabled={isConnecting && selectedPlatform === 'instagram'}
          >
            <Instagram className="h-4 w-4 mr-2" />
            {isConnected ? "Connected to Instagram" : "Connect Instagram"}
          </Button>
        );
      case 'linkedin':
        return (
          <Button 
            variant={isConnected ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleConnect('linkedin')}
            disabled={isConnecting && selectedPlatform === 'linkedin'}
          >
            <Linkedin className="h-4 w-4 mr-2" />
            {isConnected ? "Connected to LinkedIn" : "Connect LinkedIn"}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Connect Your Social Accounts</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Connect your social media accounts to easily share product info and receive updates.
      </p>
      
      <div className="space-y-2">
        {getButtonForPlatform('facebook')}
        {getButtonForPlatform('twitter')}
        {getButtonForPlatform('instagram')}
        {getButtonForPlatform('linkedin')}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="px-0 text-sm">
            Why connect social accounts?
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Benefits of Connecting Social Accounts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Easily share products and reviews with your followers</li>
              <li>Receive notifications about products and deals you're interested in</li>
              <li>Participate in exclusive social media promotions</li>
              <li>Connect with other users who share your interests</li>
              <li>Get personalized recommendations based on your social profile</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              We value your privacy. We will never post to your accounts without your permission.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
