import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '#/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { accounts } from '#/db/schema/accounts';
import { users } from '#/db/schema/users';
import { sessions } from '#/db/schema/sessions';

export const authOptions = {
	adapter: DrizzleAdapter(db, {
		accountsTable: accounts,
		usersTable: users,
		sessionsTable: sessions,
	}),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
};
