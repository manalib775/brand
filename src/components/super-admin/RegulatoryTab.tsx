
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegulatoryTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Authorities Management</CardTitle>
          <CardDescription>Add and manage regulatory bodies for different industry segments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Authority Name</Label>
                <Input placeholder="e.g., RBI Ombudsman, TRAI, IRDA" />
              </div>
              <div className="space-y-2">
                <Label>Industry Segment</Label>
                <select className="w-full rounded-md border p-2">
                  <option>Banking & Finance</option>
                  <option>Telecom</option>
                  <option>Insurance</option>
                  <option>Aviation</option>
                  <option>E-commerce</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Portal URL</Label>
                <Input placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Contact Information</Label>
                <Input placeholder="Phone Number" className="mb-2" />
                <Input placeholder="Email Address" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea 
                  className="w-full min-h-[100px] p-2 rounded-md border"
                  placeholder="Brief description of the regulatory authority"
                />
              </div>
              <div className="space-y-2">
                <Label>Escalation Level</Label>
                <Input type="number" min="1" placeholder="e.g., 1, 2, 3" />
                <p className="text-xs text-muted-foreground">
                  Level 1 is typically the first point of escalation, higher numbers indicate further escalation
                </p>
              </div>
              <div className="space-y-2">
                <Label>Expected Turnaround Time</Label>
                <Input placeholder="e.g., 7-10 business days" />
              </div>
              <Button className="w-full">Add Regulatory Authority</Button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Existing Regulatory Authorities</h3>
            <div className="space-y-2">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-medium">RBI Banking Ombudsman</h4>
                  <p className="text-sm text-muted-foreground">Banking & Finance - Level 2</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-medium">TRAI Consumer Complaint Portal</h4>
                  <p className="text-sm text-muted-foreground">Telecom - Level 1</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
