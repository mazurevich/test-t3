import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { posts } from "./posts";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: varchar("phone", { length: 256 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
