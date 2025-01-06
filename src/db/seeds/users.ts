import { users } from "../schema";
import { seed } from "drizzle-seed";
import { type db } from "../index";

export async function seedTable(db: db) {
  await seed(db, { users }).refine((funcs) => ({
    users: {
      count: 100,
      columns: {
        phone: funcs.phoneNumber({ template: "37529#######" }),
        firstName: funcs.firstName(),
        lastName: funcs.lastName({ isUnique: true }),
      },
    },
  }));
}
