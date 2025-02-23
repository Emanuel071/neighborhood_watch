import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import type { Event } from "@shared/schema";

const categoryColors = {
  "social": "bg-blue-500",
  "maintenance": "bg-yellow-500",
  "safety": "bg-red-500",
  "other": "bg-gray-500"
} as const;

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{event.title}</CardTitle>
          <Badge variant="secondary" className={categoryColors[event.category as keyof typeof categoryColors]}>
            {event.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground line-clamp-2">{event.description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {format(new Date(event.date), "PPP")}
        </div>
      </CardContent>
    </Card>
  );
}
