import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import { Account, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '#/db';
import { accounts } from '#/db/schema/accounts';
import { sessions } from '#/db/schema/sessions';
import { users } from '#/db/schema/users';

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
			allowDangerousEmailAccountLinking: true,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		signIn: async ({ user, account }: { user: User; account: Account }) => {
			console.log('signIn', user, account);
			if (!user.email) return false;

			// Check if user with this email already exists
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, user.email),
			});

			if (existingUser) {
				// Link the new OAuth account to the existing user
				user.id = existingUser.id;
			}

			return true;
		},
	},
};
