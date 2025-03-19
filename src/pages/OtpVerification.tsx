
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

export default function OtpVerification() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useCustomerAuth();
  
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Get email and name from location state or use defaults
  const email = location.state?.email || "user@example.com";
  const name = location.state?.name || "New User";

  // Start countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !isVerified) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isVerified]);

  const verifyOtp = () => {
    // For demo purposes, any 6-digit OTP is considered valid
    if (otp.length === 6) {
      setIsVerified(true);
      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
      });

      // Register the new user
      login({
        id: `new-user-${Date.now()}`,
        name: name,
        email: email,
        location: "Location not set",
        joinDate: new Date().toISOString(),
        isVerified: true,
        profilePicture: "/placeholder.svg",
        products: [],
        reviews: [],
        complaints: []
      });

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP code.",
        variant: "destructive"
      });
    }
  };

  const resendOtp = () => {
    setIsResending(true);
    
    // Simulate OTP resend
    setTimeout(() => {
      setTimer(60);
      setIsResending(false);
      toast({
        title: "OTP Resent!",
        description: `A new verification code has been sent to ${email}`,
      });
    }, 1500);
  };

  return (
    <div className="container max-w-lg mx-auto py-12 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center px-4 py-6 bg-primary/5 rounded-lg">
                <Mail className="w-6 h-6 text-primary mr-2" />
                <p className="text-sm">
                  We've sent a verification code to <span className="font-medium">{email}</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="grid place-items-center">
                  <InputOTP 
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    className="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <Button 
                onClick={verifyOtp} 
                className="w-full"
                disabled={otp.length !== 6}
              >
                Verify Email
              </Button>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Didn't receive the code?
                </span>
                {timer > 0 ? (
                  <span className="text-muted-foreground">Resend in {timer}s</span>
                ) : (
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={resendOtp}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-8 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">Verification Complete</h3>
                <p className="text-muted-foreground">
                  Your email has been verified. Redirecting to your profile...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
