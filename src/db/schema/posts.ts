import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const posts = pgTable("posts", {
  id: serial().primaryKey(),
  title: text(),
  content: text(),
  userId: integer().references(() => users.id),
});

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
