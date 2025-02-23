import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Home } from "lucide-react";

export default function NavBar() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <a className="text-xl font-bold text-primary">NeighborHub</a>
            </Link>
            
            <div className="flex space-x-4">
              <Link href="/">
                <a className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                  location === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}>
                  <Home size={20} />
                  <span>Home</span>
                </a>
              </Link>
              
              <Link href="/events">
                <a className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                  location === "/events" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}>
                  <Calendar size={20} />
                  <span>Events</span>
                </a>
              </Link>
              
              <Link href="/notifications">
                <a className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                  location === "/notifications" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}>
                  <Bell size={20} />
                  <span>Notifications</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
