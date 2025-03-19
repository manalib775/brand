
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, Clock, CheckCircle } from "lucide-react";

const DAYS_OF_WEEK = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

const TIME_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1).map(num => ({
  value: num.toString(),
  label: num.toString(),
}));

export function BrandDashboardCustomerService() {
  const { toast } = useToast();
  const [serviceFormData, setServiceFormData] = useState({
    tollFreeNumber: "",
    customerServiceNumber: "",
    supportEmail: "",
    selectedDays: [] as string[],
    startTimeHour: "9",
    startTimeMinute: "00",
    startTimePeriod: "AM",
    endTimeHour: "5",
    endTimeMinute: "00", 
    endTimePeriod: "PM",
    responseTime: "24",
    hasLiveChat: false,
    hasSocialSupport: false,
    hasEmailSupport: true,
    hasPhoneSupport: true,
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setServiceFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDayToggle = (day: string) => {
    setServiceFormData(prev => {
      const currentDays = [...prev.selectedDays];
      
      if (currentDays.includes(day)) {
        return {
          ...prev,
          selectedDays: currentDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          selectedDays: [...currentDays, day]
        };
      }
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your customer service settings have been updated."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Customer support contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tollFreeNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Toll-Free Number (Optional)
            </Label>
            <Input 
              id="tollFreeNumber" 
              placeholder="Enter toll-free number" 
              value={serviceFormData.tollFreeNumber}
              onChange={(e) => handleInputChange("tollFreeNumber", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customerServiceNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Customer Service Number
            </Label>
            <Input 
              id="customerServiceNumber" 
              placeholder="Enter customer service number" 
              value={serviceFormData.customerServiceNumber}
              onChange={(e) => handleInputChange("customerServiceNumber", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportEmail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Support Email
            </Label>
            <Input 
              id="supportEmail" 
              type="email" 
              placeholder="Enter support email" 
              value={serviceFormData.supportEmail}
              onChange={(e) => handleInputChange("supportEmail", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> Support Hours
          </CardTitle>
          <CardDescription>When customers can reach your support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Days of Operation</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`day-${day.value}`} 
                      checked={serviceFormData.selectedDays.includes(day.value)}
                      onCheckedChange={() => handleDayToggle(day.value)}
                    />
                    <Label htmlFor={`day-${day.value}`} className="text-sm">{day.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={serviceFormData.startTimeHour} 
                    onValueChange={(value) => handleInputChange("startTimeHour", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem key={`start-hour-${time.value}`} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select 
                    value={serviceFormData.startTimeMinute} 
                    onValueChange={(value) => handleInputChange("startTimeMinute", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="00">00</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="45">45</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={serviceFormData.startTimePeriod} 
                    onValueChange={(value) => handleInputChange("startTimePeriod", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>End Time</Label>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={serviceFormData.endTimeHour} 
                    onValueChange={(value) => handleInputChange("endTimeHour", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem key={`end-hour-${time.value}`} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select 
                    value={serviceFormData.endTimeMinute} 
                    onValueChange={(value) => handleInputChange("endTimeMinute", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="00">00</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="45">45</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={serviceFormData.endTimePeriod} 
                    onValueChange={(value) => handleInputChange("endTimePeriod", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support Channels</CardTitle>
          <CardDescription>How customers can reach your support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasPhoneSupport" 
                checked={serviceFormData.hasPhoneSupport}
                onCheckedChange={(checked) => handleInputChange("hasPhoneSupport", !!checked)}
              />
              <Label htmlFor="hasPhoneSupport">Phone Support</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasEmailSupport" 
                checked={serviceFormData.hasEmailSupport}
                onCheckedChange={(checked) => handleInputChange("hasEmailSupport", !!checked)}
              />
              <Label htmlFor="hasEmailSupport">Email Support</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasLiveChat" 
                checked={serviceFormData.hasLiveChat}
                onCheckedChange={(checked) => handleInputChange("hasLiveChat", !!checked)}
              />
              <Label htmlFor="hasLiveChat">Live Chat</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasSocialSupport" 
                checked={serviceFormData.hasSocialSupport}
                onCheckedChange={(checked) => handleInputChange("hasSocialSupport", !!checked)}
              />
              <Label htmlFor="hasSocialSupport">Social Media Support</Label>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            className="mt-6"
            variant="default"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
