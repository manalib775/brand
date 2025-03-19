
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, EyeIcon, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

type ApprovalStatus = 'pending' | 'approved' | 'rejected';
type ApprovalRequest = {
  id: number;
  type: string;
  name: string;
  requestedBy: string;
  date: string;
  status: ApprovalStatus;
  details: string;
};

export function ApprovalsTab() {
  const [currentView, setCurrentView] = useState<ApprovalStatus | 'all'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();

  // Sample approval requests data
  const approvalRequests: ApprovalRequest[] = [
    {
      id: 1,
      type: "Brand Registration",
      name: "Acme Electronics",
      requestedBy: "John Smith",
      date: "2024-06-01T10:30:00",
      status: "pending",
      details: "New electronics retailer specialized in smart home devices."
    },
    {
      id: 2,
      type: "Helpster Application",
      name: "Sarah Johnson",
      requestedBy: "Sarah Johnson",
      date: "2024-05-29T15:45:00",
      status: "approved",
      details: "Experienced customer service professional with 5+ years in consumer electronics."
    },
    {
      id: 3,
      type: "Content Correction",
      name: "Samsung Support Hours",
      requestedBy: "Mike Thompson",
      date: "2024-05-30T09:15:00",
      status: "pending",
      details: "Support hours have changed to 24/7 for premium customers."
    },
    {
      id: 4,
      type: "Brand Registration",
      name: "TechPro Solutions",
      requestedBy: "Lisa Wang",
      date: "2024-05-28T11:20:00",
      status: "rejected",
      details: "Insufficient documentation provided for business verification."
    }
  ];

  const filteredApprovals = approvalRequests.filter(request => {
    if (currentView === "all") return true;
    return request.status === currentView;
  });

  const updateApprovalStatus = (id: number, newStatus: 'approved' | 'rejected') => {
    console.log(`Updating approval ${id} to ${newStatus}`);
    toast({
      title: `Request ${newStatus}`,
      description: `The request has been ${newStatus}.`
    });
    setShowDetailsDialog(false);
  };

  const getStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
    }
  };

  const handleViewDetails = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Approval Requests</CardTitle>
          <CardDescription>Manage approval requests for brand registrations, helpsters, and content changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button 
                variant={currentView === 'pending' ? 'default' : 'outline'} 
                onClick={() => setCurrentView('pending')}
                className="flex items-center"
              >
                <Clock className="h-4 w-4 mr-2" />
                Pending
              </Button>
              <Button 
                variant={currentView === 'approved' ? 'default' : 'outline'} 
                onClick={() => setCurrentView('approved')}
                className="flex items-center"
              >
                <Check className="h-4 w-4 mr-2" />
                Approved
              </Button>
              <Button 
                variant={currentView === 'rejected' ? 'default' : 'outline'} 
                onClick={() => setCurrentView('rejected')}
                className="flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Rejected
              </Button>
              <Button 
                variant={currentView === 'all' ? 'default' : 'outline'} 
                onClick={() => setCurrentView('all')}
              >
                All
              </Button>
            </div>

            <div className="space-y-4 mt-6">
              {filteredApprovals.map((request) => (
                <div key={request.id} className="border rounded-md p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{request.name}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {request.type} • Requested by {request.requestedBy} • {format(new Date(request.date), "MMM d, yyyy")}
                    </p>
                    <p className="text-sm">{request.details}</p>
                  </div>
                  <div className="flex sm:flex-col gap-2 justify-end">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => handleViewDetails(request)}
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Details</span>
                    </Button>
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                          onClick={() => updateApprovalStatus(request.id, 'approved')}
                        >
                          <Check className="h-4 w-4" />
                          <span className="hidden sm:inline">Approve</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="flex items-center gap-1"
                          onClick={() => updateApprovalStatus(request.id, 'rejected')}
                        >
                          <X className="h-4 w-4" />
                          <span className="hidden sm:inline">Reject</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {filteredApprovals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No {currentView !== 'all' ? currentView : ''} approval requests found.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedRequest && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedRequest.name}</DialogTitle>
              <DialogDescription>{selectedRequest.type} Request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Requested By:</div>
                <div>{selectedRequest.requestedBy}</div>
                <div className="text-muted-foreground">Request Date:</div>
                <div>{format(new Date(selectedRequest.date), "MMMM d, yyyy h:mm a")}</div>
                <div className="text-muted-foreground">Status:</div>
                <div>{getStatusBadge(selectedRequest.status)}</div>
              </div>
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Request Details:</h4>
                <p className="text-sm">{selectedRequest.details}</p>
              </div>
            </div>
            {selectedRequest.status === 'pending' && (
              <div className="flex justify-end gap-2">
                <Button 
                  variant="destructive" 
                  onClick={() => updateApprovalStatus(selectedRequest.id, 'rejected')}
                >
                  Reject
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => updateApprovalStatus(selectedRequest.id, 'approved')}
                >
                  Approve
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
