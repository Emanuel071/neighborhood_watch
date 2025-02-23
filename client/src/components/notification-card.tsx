import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import type { Notification } from "@shared/schema";
import { cn } from "@/lib/utils";

const typeConfig = {
  alert: {
    icon: AlertCircle,
    class: "text-red-500",
    badge: "bg-red-500"
  },
  warning: {
    icon: AlertTriangle,
    class: "text-yellow-500",
    badge: "bg-yellow-500"
  },
  info: {
    icon: Info,
    class: "text-blue-500",
    badge: "bg-blue-500"
  }
} as const;

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard({ notification }: NotificationCardProps) {
  const config = typeConfig[notification.type as keyof typeof typeConfig];
  const Icon = config.icon;

  return (
    <Card className={cn("border-l-4", {
      "border-l-red-500": notification.type === "alert",
      "border-l-yellow-500": notification.type === "warning",
      "border-l-blue-500": notification.type === "info"
    })}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5", config.class)} />
            <CardTitle className="line-clamp-1">{notification.title}</CardTitle>
          </div>
          {notification.urgent && (
            <Badge variant="destructive">Urgent</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground">{notification.message}</p>
        <p className="text-sm text-muted-foreground">
          {notification.timestamp ? format(new Date(notification.timestamp), "PPP") : "No date"}
        </p>
      </CardContent>
    </Card>
  );
}