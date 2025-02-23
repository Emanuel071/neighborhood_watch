import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Notification } from "@shared/schema";
import NotificationCard from "@/components/notification-card";
import CreateNotificationDialog from "@/components/create-notification-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const notificationTypes = ["all", "info", "warning", "alert"] as const;

export default function Notifications() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  
  const { data: notifications = [], isLoading } = useQuery<Notification[]>({ 
    queryKey: ["/api/notifications"]
  });

  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(search.toLowerCase()) ||
                          notification.message.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType === "all" || notification.type === selectedType;
      const matchesUrgent = !showUrgentOnly || notification.urgent;
      return matchesSearch && matchesType && matchesUrgent;
    })
    .sort((a, b) => {
      // Sort by urgency first, then by timestamp
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Community Notifications</h1>
        <CreateNotificationDialog />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-[300px]"
        />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {notificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="urgent-only"
            checked={showUrgentOnly}
            onCheckedChange={setShowUrgentOnly}
          />
          <Label htmlFor="urgent-only">Urgent only</Label>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
          ))}
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No notifications found</p>
          {(search || showUrgentOnly) && (
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          )}
        </div>
      )}
    </div>
  );
}
