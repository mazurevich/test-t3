import { createTRPCRouter, publicProcedure } from "#/server/api/trpc";
import { db } from "#/db";

export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(() => {
    return db.query.users.findMany({ with: { posts: true } });
  }),
});
