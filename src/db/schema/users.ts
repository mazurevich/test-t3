import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { posts } from "./posts";

export const users = pgTable("users", {
  id: serial().primaryKey(),
  firstName: text(),
  lastName: text(),
  phone: varchar({ length: 256 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
