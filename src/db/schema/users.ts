import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { accounts } from './accounts';
import { posts } from './posts';
import { sessions } from './sessions';

export const users = pgTable('users', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text(),
	email: text().unique(),
	emailVerified: timestamp({ mode: 'date' }),
	image: text(),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	accounts: many(accounts),
	session: many(sessions),
}));
