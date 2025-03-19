import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Bell, 
  Users, 
  Building,
  Send,
  Trash2,
  Edit,
  Plus,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  from: string;
  to: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

type NotificationTemplate = {
  id: number;
  name: string;
  description: string;
  template: string;
  type: 'brand' | 'customer' | 'review';
};

export function MessagesTab() {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [newTemplateData, setNewTemplateData] = useState<Partial<NotificationTemplate>>({
    name: '',
    description: '',
    template: '',
    type: 'brand'
  });
  const [replyText, setReplyText] = useState("");
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  const dummyMessages: Message[] = [
    {
      id: 1,
      from: "Customer Support",
      to: "Admin",
      subject: "New brand registration needs approval",
      message: "A new brand 'TechPro Solutions' has been registered and needs approval before it appears on the platform.",
      date: "2024-06-10T14:30:00",
      read: false
    },
    {
      id: 2,
      from: "System",
      to: "Admin",
      subject: "Weekly analytics report",
      message: "Your weekly analytics report is now available. Customer engagement is up 15% from last week.",
      date: "2024-06-09T09:15:00", 
      read: true
    },
    {
      id: 3,
      from: "James Wilson",
      to: "Admin",
      subject: "Content moderation issue",
      message: "We've identified several reviews that may violate our content policy. Please review them at your earliest convenience.",
      date: "2024-06-08T16:45:00",
      read: true
    }
  ];

  const notificationTemplates: NotificationTemplate[] = [
    {
      id: 1,
      name: "Brand Approval Notification",
      description: "Sent when a brand is approved",
      template: "Congratulations! Your brand {{brandName}} has been approved and is now live on our platform.",
      type: "brand"
    },
    {
      id: 2,
      name: "New Review Notification",
      description: "Notifies brands of new reviews",
      template: "A new review has been posted for your brand {{brandName}} by {{customerName}}.",
      type: "review"
    },
    {
      id: 3,
      name: "Service Request Update",
      description: "Updates on service request status",
      template: "Your service request for {{productName}} has been updated to {{status}}.",
      type: "customer"
    }
  ];

  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [templates, setTemplates] = useState<NotificationTemplate[]>(notificationTemplates);

  const markAsRead = (id: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    setShowMessageDialog(false);
    toast({
      title: "Message deleted",
      description: "The message has been successfully deleted."
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply message.",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Sending reply:", {
      to: selectedMessage?.from,
      subject: `Re: ${selectedMessage?.subject}`,
      message: replyText
    });
    
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully."
    });
    
    setReplyText("");
    setShowMessageDialog(false);
  };

  const handleSendNewMessage = () => {
    if (!newMessage.to.trim() || !newMessage.subject.trim() || !newMessage.message.trim()) {
      toast({
        title: "Incomplete message",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newMsg: Message = {
      id: messages.length + 1,
      from: "Admin",
      to: newMessage.to,
      subject: newMessage.subject,
      message: newMessage.message,
      date: new Date().toISOString(),
      read: true
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully."
    });
    
    setNewMessage({ to: "", subject: "", message: "" });
    setShowNewMessageDialog(false);
  };

  const handleEditTemplate = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setNewTemplateData({
      name: template.name,
      description: template.description,
      template: template.template,
      type: template.type
    });
    setShowTemplateDialog(true);
  };

  const handleAddNewTemplate = () => {
    setSelectedTemplate(null);
    setNewTemplateData({
      name: '',
      description: '',
      template: '',
      type: 'brand'
    });
    setShowTemplateDialog(true);
  };

  const handleSaveTemplate = () => {
    if (!newTemplateData.name?.trim() || !newTemplateData.template?.trim()) {
      toast({
        title: "Incomplete template",
        description: "Please fill in at least the name and template content.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedTemplate) {
      setTemplates(prev => 
        prev.map(tpl => 
          tpl.id === selectedTemplate.id 
            ? { 
                ...tpl, 
                name: newTemplateData.name || tpl.name,
                description: newTemplateData.description || tpl.description,
                template: newTemplateData.template || tpl.template,
                type: newTemplateData.type || tpl.type
              } 
            : tpl
        )
      );
      
      toast({
        title: "Template updated",
        description: "The notification template has been updated successfully."
      });
    } else {
      const newTpl: NotificationTemplate = {
        id: templates.length + 1,
        name: newTemplateData.name || '',
        description: newTemplateData.description || '',
        template: newTemplateData.template || '',
        type: newTemplateData.type as 'brand' | 'customer' | 'review'
      };
      
      setTemplates(prev => [...prev, newTpl]);
      
      toast({
        title: "Template created",
        description: "The new notification template has been created successfully."
      });
    }
    
    setShowTemplateDialog(false);
  };

  const handleTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTemplateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages & Notifications</CardTitle>
          <CardDescription>Manage system messages and notification templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="messages" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                Notification Templates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Inbox</h3>
                  <p className="text-sm text-muted-foreground">
                    {messages.filter(m => !m.read).length} unread messages
                  </p>
                </div>
                <Button onClick={() => setShowNewMessageDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
              
              <div className="space-y-3">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${!message.read ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <div className="flex justify-between">
                      <span className={`font-medium ${!message.read ? 'font-semibold' : ''}`}>{message.from}</span>
                      <span className="text-sm text-muted-foreground">{new Date(message.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm">{message.subject}</div>
                    <div className="text-sm text-muted-foreground truncate mt-1">{message.message}</div>
                  </div>
                ))}
                
                {messages.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No messages found.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Notification Templates</h3>
                <Button onClick={handleAddNewTemplate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Brand Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {templates
                        .filter(t => t.type === 'brand')
                        .map(template => (
                          <div key={template.id} className="border rounded-md p-2">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium">{template.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => handleEditTemplate(template)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        ))}
                      
                      {templates.filter(t => t.type === 'brand').length === 0 && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          No brand templates
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Customer Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {templates
                        .filter(t => t.type === 'customer')
                        .map(template => (
                          <div key={template.id} className="border rounded-md p-2">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium">{template.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => handleEditTemplate(template)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        ))}
                      
                      {templates.filter(t => t.type === 'customer').length === 0 && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          No customer templates
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Review Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {templates
                        .filter(t => t.type === 'review')
                        .map(template => (
                          <div key={template.id} className="border rounded-md p-2">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium">{template.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => handleEditTemplate(template)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        ))}
                      
                      {templates.filter(t => t.type === 'review').length === 0 && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          No review templates
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMessage.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm">
              <span className="text-muted-foreground">From:</span> {selectedMessage.from}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Date:</span> {new Date(selectedMessage.date).toLocaleString()}
            </div>
            <div className="border-t pt-4">
              <p>{selectedMessage.message}</p>
            </div>
            <div className="border-t pt-4">
              <Label>Reply</Label>
              <Textarea 
                className="mt-2"
                placeholder="Type your reply here..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => handleDeleteMessage(selectedMessage.id)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button 
              onClick={handleSendReply}
              className="flex items-center gap-1"
            >
              <Send className="h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>To</Label>
              <Input 
                placeholder="Recipient" 
                value={newMessage.to}
                onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input 
                placeholder="Subject" 
                value={newMessage.subject}
                onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea 
                placeholder="Type your message here..." 
                className="min-h-[120px]"
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleSendNewMessage}
              className="flex items-center gap-1"
            >
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate ? 'Edit Notification Template' : 'Create New Template'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Template Name</Label>
              <Input 
                name="name"
                placeholder="E.g., Brand Approval Notification" 
                value={newTemplateData.name}
                onChange={handleTemplateInputChange}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input 
                name="description"
                placeholder="Brief description of when this template is used" 
                value={newTemplateData.description}
                onChange={handleTemplateInputChange}
              />
            </div>
            <div>
              <Label>Template Type</Label>
              <select 
                name="type"
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                value={newTemplateData.type}
                onChange={handleTemplateInputChange}
              >
                <option value="brand">Brand Notification</option>
                <option value="customer">Customer Notification</option>
                <option value="review">Review Notification</option>
              </select>
            </div>
            <div>
              <Label>Template Content</Label>
              <Textarea 
                name="template"
                placeholder="Write your template here..." 
                className="min-h-[120px]"
                value={newTemplateData.template}
                onChange={handleTemplateInputChange}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Available variables: {"{{brandName}}"} {"{{customerName}}"} {"{{productName}}"} {"{{status}}"} {"{{date}}"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveTemplate}>
              {selectedTemplate ? 'Update Template' : 'Create Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
