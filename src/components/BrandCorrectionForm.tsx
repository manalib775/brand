
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, Check } from "lucide-react";

interface BrandCorrectionFormProps {
  brandName: string;
}

export function BrandCorrectionForm({ brandName }: BrandCorrectionFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [correctionType, setCorrectionType] = useState<string>("");
  const [correctionText, setCorrectionText] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!correctionType || !correctionText.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a correction type and provide details.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit correction
    setSubmitted(true);
    toast({
      title: "Correction submitted",
      description: "Thank you for helping us improve our information!",
    });
  };

  const resetForm = () => {
    setCorrectionType("");
    setCorrectionText("");
    setSubmitted(false);
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Suggest a Correction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Suggest a Correction</DialogTitle>
          <DialogDescription>
            Help us improve information about {brandName}
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="correction-type">What needs to be corrected?</Label>
              <Select 
                value={correctionType} 
                onValueChange={setCorrectionType}
                required
              >
                <SelectTrigger id="correction-type">
                  <SelectValue placeholder="Select correction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inaccurate-info">Inaccurate information</SelectItem>
                  <SelectItem value="outdated-info">Outdated information</SelectItem>
                  <SelectItem value="missing-info">Missing information</SelectItem>
                  <SelectItem value="contact-info">Wrong contact details</SelectItem>
                  <SelectItem value="product-info">Product details</SelectItem>
                  <SelectItem value="other">Other issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="correction-details">Correction Details</Label>
              <Textarea 
                id="correction-details" 
                placeholder="Please provide specific details about what needs to be corrected..."
                value={correctionText}
                onChange={(e) => setCorrectionText(e.target.value)}
                rows={5}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">Submit Correction</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-6 text-center">
            <div className="rounded-full bg-green-100 p-3 mx-auto w-14 h-14 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
              Your correction suggestion for {brandName} has been submitted. 
              Our team will review it shortly.
            </p>
            <Button 
              onClick={() => setIsOpen(false)} 
              className="mt-2"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
