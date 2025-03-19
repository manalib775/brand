
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScanLine, Camera, AlertCircle } from "lucide-react";

interface QRBarcodeScannerProps {
  onScanComplete: (data: string) => void;
}

export function QRBarcodeScanner({ onScanComplete }: QRBarcodeScannerProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  
  const startScanning = () => {
    setIsScanning(true);
    setCameraError(false);
    
    // This is a mock implementation - in a real app, you would use
    // a library like @zxing/browser or QuaggaJS to implement scanning
    setTimeout(() => {
      // Generate a random mock serial number
      const mockSerialNumber = `SN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      setIsScanning(false);
      toast({
        title: "Scan Successful!",
        description: `Product serial number detected: ${mockSerialNumber}`,
      });
      
      onScanComplete(mockSerialNumber);
      setIsOpen(false);
    }, 3000);
  };
  
  const handleScanError = () => {
    setIsScanning(false);
    setCameraError(true);
    
    toast({
      title: "Camera Access Error",
      description: "Could not access your camera. Please check permissions and try again.",
      variant: "destructive"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ScanLine className="h-4 w-4 mr-2" />
          Scan QR Code / Barcode
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Scan Product Code</DialogTitle>
          <DialogDescription>
            Position the QR code or barcode within the scanner frame
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          {cameraError ? (
            <div className="text-center py-8">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Camera Access Error</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't access your camera. Please check your browser permissions.
              </p>
              <Button onClick={() => setCameraError(false)}>Try Again</Button>
            </div>
          ) : (
            <>
              <div className="relative w-full max-w-sm aspect-video bg-black mb-4 rounded-lg overflow-hidden">
                {/* This would be a video element in a real implementation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isScanning ? (
                    <div className="text-white flex flex-col items-center">
                      <div className="h-32 w-32 border-2 border-primary relative">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-scan"></div>
                      </div>
                      <p className="mt-4 text-sm">Scanning...</p>
                    </div>
                  ) : (
                    <Camera className="h-16 w-16 text-white/50" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2 w-full">
                <Button 
                  onClick={startScanning} 
                  disabled={isScanning} 
                  className="w-full"
                >
                  {isScanning ? "Scanning..." : "Start Scanning"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Point your camera at the QR code or barcode on your product or packaging
                </p>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)} 
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          
          <Button 
            onClick={() => {
              // Generate a random mock serial number
              const mockSerialNumber = `SN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
              onScanComplete(mockSerialNumber);
              setIsOpen(false);
            }}
            className="w-full sm:w-auto"
          >
            Enter Manually
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
