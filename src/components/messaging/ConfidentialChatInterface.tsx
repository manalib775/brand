
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, PaperclipIcon, Image as ImageIcon, Smile, Lock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "brand" | "encrypted";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  isEncrypted?: boolean;
}

interface ConfidentialChatInterfaceProps {
  brandName: string;
  brandLogo?: string;
  isPrivateChat?: boolean;
  isPlatformChat?: boolean;
  onClose?: () => void;
}

export function ConfidentialChatInterface({ 
  brandName, 
  brandLogo = "/placeholder.svg", 
  isPrivateChat = false,
  isPlatformChat = false,
  onClose 
}: ConfidentialChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: isPrivateChat 
        ? `Hello! This is a private conversation between you and ${brandName}. Messages are end-to-end encrypted.` 
        : isPlatformChat 
          ? `Welcome to your confidential channel with the platform support team. How can we help?`
          : `Hello! Welcome to ${brandName} support. How can we help you today?`,
      sender: isPrivateChat || isPlatformChat ? "encrypted" : "brand",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: "read",
      isEncrypted: isPrivateChat || isPlatformChat
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Add the new message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
      isEncrypted: isPrivateChat || isPlatformChat
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isPrivateChat 
          ? `Thank you for your message. ${brandName} will respond to your private inquiry shortly.` 
          : isPlatformChat 
            ? "Thank you for contacting platform support. A team member will respond shortly."
            : `Thank you for your message. A customer service representative from ${brandName} will respond shortly.`,
        sender: isPrivateChat || isPlatformChat ? "encrypted" : "brand",
        timestamp: new Date(),
        status: "sent",
        isEncrypted: isPrivateChat || isPlatformChat
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      toast({
        title: "Message Sent",
        description: isPrivateChat 
          ? `Your private message has been sent to ${brandName}` 
          : isPlatformChat
            ? "Your message has been sent to platform support"
            : `Your message has been sent to ${brandName}`,
      });
    }, 1000);
  };

  return (
    <Card className={`w-full max-w-md shadow-lg ${isPrivateChat ? 'border-t-4 border-t-green-500' : isPlatformChat ? 'border-t-4 border-t-purple-500' : 'border-t-4 border-t-blue-500'}`}>
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <img src={brandLogo} alt={brandName} className="object-cover" />
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">{brandName}</CardTitle>
              {isPrivateChat && (
                <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                  <Lock className="h-3 w-3" /> Private & Encrypted
                </Badge>
              )}
              {isPlatformChat && (
                <Badge variant="outline" className="text-xs flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200">
                  <Shield className="h-3 w-3" /> Platform Support
                </Badge>
              )}
              {!isPrivateChat && !isPlatformChat && (
                <Badge variant="outline" className="text-xs">Usually responds in 2 hours</Badge>
              )}
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              &times;
            </Button>
          )}
        </div>
        {(isPrivateChat || isPlatformChat) && (
          <div className="mt-2 text-xs text-muted-foreground bg-muted p-2 rounded flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            {isPrivateChat 
              ? "This conversation is end-to-end encrypted. Only you and the brand can see these messages."
              : "This conversation is confidential between you and the platform administrators."}
          </div>
        )}
      </CardHeader>
      
      <ScrollArea ref={scrollAreaRef} className="h-[350px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "brand" && (
                <Avatar className="h-8 w-8 mr-2">
                  <img src={brandLogo} alt={brandName} className="object-cover" />
                </Avatar>
              )}
              {message.sender === "encrypted" && (
                <Avatar className="h-8 w-8 mr-2">
                  <div className="h-full w-full bg-green-100 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-green-600" />
                  </div>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : message.sender === "encrypted"
                    ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {message.isEncrypted && (
                  <div className="flex items-center mb-1 text-xs text-green-600 dark:text-green-400">
                    <Lock className="h-3 w-3 mr-1" />
                    <span>Encrypted</span>
                  </div>
                )}
                <p>{message.content}</p>
                <div className={`text-xs mt-1 ${
                  message.sender === "user" 
                    ? "text-blue-100" 
                    : message.sender === "encrypted"
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {message.sender === "user" && (
                    <span className="ml-1">
                      {message.status === "sent" && "✓"}
                      {message.status === "delivered" && "✓✓"}
                      {message.status === "read" && "✓✓"}
                    </span>
                  )}
                </div>
              </div>
              
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <img src="/placeholder.svg" alt="User" className="object-cover" />
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <CardFooter className="border-t p-3">
        <div className="flex items-center w-full space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-4 w-4" />
          </Button>
          
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
            className="h-8 w-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
