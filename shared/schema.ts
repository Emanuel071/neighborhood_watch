import { pgTable, text, serial, timestamp, boolean, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").notNull(),
  userId: integer("user_id").notNull(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'alert', 'info', 'warning'
  userId: integer("user_id").notNull(),
  urgent: boolean("urgent").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  category: true,
  date: true,
  userId: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  title: true,
  message: true,
  type: true,
  userId: true,
  urgent: true,
});

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;