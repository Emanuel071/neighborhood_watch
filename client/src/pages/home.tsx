import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Event, Notification } from "@shared/schema";
import EventCard from "@/components/event-card";
import NotificationCard from "@/components/notification-card";
import { Link } from "wouter";

const communityPhotos = [
  "https://images.unsplash.com/photo-1620495114751-6968be5a7a25",
  "https://images.unsplash.com/photo-1736456084924-c39e02004cfe",
  "https://images.unsplash.com/photo-1522543558187-768b6df7c25c",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
];

export default function Home() {
  const { data: events = [] } = useQuery<Event[]>({ 
    queryKey: ["/api/events"]
  });

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"]
  });

  const recentEvents = events.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to NeighborHub</h1>
        <p className="text-xl text-muted-foreground">
          Stay connected with your community
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityPhotos.map((photo, i) => (
          <Card key={i} className="overflow-hidden">
            <img 
              src={photo} 
              alt="Community" 
              className="w-full h-48 object-cover"
            />
          </Card>
        ))}
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Events</h2>
            <Link href="/events">
              <a className="text-primary hover:underline">View all</a>
            </Link>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Notifications</h2>
            <Link href="/notifications">
              <a className="text-primary hover:underline">View all</a>
            </Link>
          </div>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
