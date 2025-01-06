import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

config({ path: ".env" });

const { env } = process;

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
    onnotice: env.DB_SEEDING ? (notice) => console.log(notice) : undefined,
  },
  schema,
  logger: true,
  casing: "snake_case",
});

export type db = typeof db;
