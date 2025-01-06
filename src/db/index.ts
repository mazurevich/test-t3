import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

config({ path: ".env" });

const { env } = process;

export const connection = postgres(process.env.DATABASE_URL!, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? (notice) => console.log(notice) : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;
