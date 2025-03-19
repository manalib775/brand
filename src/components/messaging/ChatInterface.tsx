
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, PaperclipIcon, Image as ImageIcon, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "brand";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatInterfaceProps {
  brandName: string;
  brandLogo?: string;
  onClose?: () => void;
}

export function ChatInterface({ brandName, brandLogo = "/placeholder.svg", onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! Welcome to ${brandName} support. How can we help you today?`,
      sender: "brand",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: "read"
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
      status: "sent"
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate brand response after a short delay
    setTimeout(() => {
      const brandResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your message. A customer service representative from ${brandName} will respond shortly.`,
        sender: "brand",
        timestamp: new Date(),
        status: "sent"
      };
      
      setMessages(prev => [...prev, brandResponse]);
      
      toast({
        title: "Message Received",
        description: `Your message has been sent to ${brandName}`,
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-500">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <img src={brandLogo} alt={brandName} className="object-cover" />
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">{brandName}</CardTitle>
              <Badge variant="outline" className="text-xs">Usually responds in 2 hours</Badge>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              &times;
            </Button>
          )}
        </div>
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
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <p>{message.content}</p>
                <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
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
