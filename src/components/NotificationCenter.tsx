
import { useState } from "react";
import { Bell, Check, MessageSquare, Star, X } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "review" | "message" | "reply" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "review",
      title: "New Review",
      message: "John Doe left a 4-star review for your brand",
      time: "10 minutes ago",
      read: false,
      actionUrl: "/brands/reviews"
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "Customer support inquiry from Sarah about order #12345",
      time: "1 hour ago",
      read: false,
      actionUrl: "/messages"
    },
    {
      id: "3",
      type: "reply",
      title: "Reply Received",
      message: "Samsung has responded to your complaint about your recent purchase",
      time: "2 hours ago",
      read: true,
      actionUrl: "/profile?tab=complaints"
    }
  ]);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? {...notification, read: true} : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({...notification, read: true}))
    );
    toast({
      title: "All notifications marked as read",
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "reply":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <NotificationBadge count={unreadCount} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-1" />
              <span className="text-xs">Mark all read</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <X className="h-4 w-4 mr-1" />
              <span className="text-xs">Clear all</span>
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 ${notification.read ? '' : 'bg-muted/50'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      {notification.actionUrl && (
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs"
                          onClick={() => window.location.href = notification.actionUrl!}
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                    {!notification.read && (
                      <Badge className="h-2 w-2 rounded-full p-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
