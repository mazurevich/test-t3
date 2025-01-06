import { posts, users } from "../schema";
import { seed } from "drizzle-seed";
import { type db } from "../index";

export async function seedTable(db: db) {
  await seed(db, { users, posts }).refine((funcs) => ({
    users: {
      count: 100,
      columns: {
        phone: funcs.phoneNumber({ template: "37529#######" }),
        firstName: funcs.firstName(),
        lastName: funcs.lastName({ isUnique: true }),
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
