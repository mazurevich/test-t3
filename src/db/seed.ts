import { type Table, getTableName, sql } from 'drizzle-orm';
import { db } from './index';
import * as schema from './schema';
import * as seeds from './seeds';

const { env } = process;

if (!env.DB_SEEDING) {
	throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
	return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

for (const table of [schema.users]) {
	// await db.delete(table); // clear tables without truncating / resetting ids
	await resetTable(db, table);
}

await seeds.seedTable(db);

await db.$client.end();
