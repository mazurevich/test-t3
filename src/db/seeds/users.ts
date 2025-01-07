import { seed } from 'drizzle-seed';
import type { db } from '../index';
import { posts, users } from '../schema';

export async function seedTable(db: db) {
	await seed(db, { users, posts }).refine((funcs) => ({
		users: {
			count: 100,
			columns: {
				name: funcs.firstName(),
				email: funcs.email(),
				emailVerified: funcs.date(),
			},
			with: {
				posts: [
					{ weight: 0.5, count: [1, 2, 3, 4] },
					{ weight: 0.5, count: [7, 8, 9] },
				],
			},
		},
		posts: {
			columns: {
				title: funcs.loremIpsum({ arraySize: 8 }),
				content: funcs.loremIpsum({ arraySize: 100 }),
			},
		},
	}));
}
