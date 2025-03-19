
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, Upload, Check, AlertCircle, Camera, CreditCard } from "lucide-react";

interface AadhaarVerificationProps {
  onVerify?: (verified: boolean) => void;
}

export function AadhaarVerification({ onVerify }: AadhaarVerificationProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFrontImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = () => {
    // Validate inputs
    if (!aadhaarNumber || !frontImage || !backImage) {
      setErrorMessage("Please provide all required information");
      setVerificationStatus("error");
      return;
    }

    // Basic Aadhaar number validation (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setErrorMessage("Please enter a valid 12-digit Aadhaar number");
      setVerificationStatus("error");
      return;
    }

    // Simulate verification process
    setVerificationStatus("verifying");
    setTimeout(() => {
      // Mock successful verification
      setVerificationStatus("success");
      if (onVerify) {
        onVerify(true);
      }
    }, 2000);
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-blue-500">
      <CardHeader>
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-500" />
          <CardTitle>Aadhaar Verification</CardTitle>
        </div>
        <CardDescription>
          Verify your identity by providing your Aadhaar details
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="aadhaar-number">Aadhaar Number</Label>
          <Input 
            id="aadhaar-number" 
            placeholder="Enter 12-digit Aadhaar number"
            value={aadhaarNumber}
            onChange={(e) => {
              // Only allow digits and limit to 12 characters
              const value = e.target.value.replace(/\D/g, '').slice(0, 12);
              setAadhaarNumber(value);
            }}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Format: XXXX XXXX XXXX (Only digits are allowed)
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Upload Front Side of Aadhaar Card</Label>
            <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${frontPreview ? 'border-green-300 bg-green-50' : 'hover:border-primary hover:bg-accent'}`}>
              {frontPreview ? (
                <div className="relative">
                  <img 
                    src={frontPreview} 
                    alt="Aadhaar front" 
                    className="w-full h-40 object-contain rounded-md"
                  />
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => {
                      setFrontImage(null);
                      setFrontPreview(null);
                    }}
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <Label 
                  htmlFor="aadhaar-front" 
                  className="flex flex-col items-center gap-2 cursor-pointer py-4"
                >
                  <CreditCard className="h-10 w-10 text-muted-foreground" />
                  <span className="text-sm font-medium block">Front Side</span>
                  <span className="text-xs text-muted-foreground">Click to browse or drag and drop</span>
                  <Input
                    id="aadhaar-front"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFrontImageChange}
                  />
                </Label>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Upload Back Side of Aadhaar Card</Label>
            <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${backPreview ? 'border-green-300 bg-green-50' : 'hover:border-primary hover:bg-accent'}`}>
              {backPreview ? (
                <div className="relative">
                  <img 
                    src={backPreview} 
                    alt="Aadhaar back" 
                    className="w-full h-40 object-contain rounded-md"
                  />
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => {
                      setBackImage(null);
                      setBackPreview(null);
                    }}
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <Label 
                  htmlFor="aadhaar-back" 
                  className="flex flex-col items-center gap-2 cursor-pointer py-4"
                >
                  <CreditCard className="h-10 w-10 text-muted-foreground" />
                  <span className="text-sm font-medium block">Back Side</span>
                  <span className="text-xs text-muted-foreground">Click to browse or drag and drop</span>
                  <Input
                    id="aadhaar-back"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleBackImageChange}
                  />
                </Label>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-4">
            <AlertCircle className="h-3 w-3 inline-block mr-1" />
            Your Aadhaar details are secure and will only be used for verification purposes. We do not store any Aadhaar card images.
          </p>
          
          <Button 
            className="w-full" 
            onClick={handleVerify}
            disabled={verificationStatus === "verifying"}
          >
            {verificationStatus === "verifying" ? (
              <>Verifying...</>
            ) : (
              <>
                {verificationStatus === "success" ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Shield className="mr-2 h-4 w-4" />
                )}
                {verificationStatus === "success" ? "Verified" : "Verify Aadhaar"}
              </>
            )}
          </Button>
          
          {verificationStatus === "error" && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded-md">
              <AlertCircle className="h-4 w-4 inline-block mr-1" />
              {errorMessage}
            </div>
          )}
          
          {verificationStatus === "success" && (
            <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded-md">
              <Check className="h-4 w-4 inline-block mr-1" />
              Aadhaar verification successful!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
