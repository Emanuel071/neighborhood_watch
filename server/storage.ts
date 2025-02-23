import { 
  User, InsertUser, 
  Event, InsertEvent,
  Notification, InsertNotification 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Notification operations
  getNotifications(): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private notifications: Map<number, Notification>;
  private currentId: { users: number; events: number; notifications: number };

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.notifications = new Map();
    this.currentId = { users: 1, events: 1, notifications: 1 };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId.events++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async getNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentId.notifications++;
    const notification: Notification = { 
      ...insertNotification, 
      id,
      timestamp: new Date()
    };
    this.notifications.set(id, notification);
    return notification;
  }
}

export const storage = new MemStorage();
