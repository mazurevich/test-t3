import { createTRPCRouter, publicProcedure } from "#/server/api/trpc";
import { db } from "#/db";
import { posts } from "#/db/schema/posts";
import { users } from "#/db/schema";
import { getTableColumns, sql } from "drizzle-orm";
import { paginationRequestSchema } from "#/core/constants";
import { getPagination } from "#/core/utils";

export const usersRouter = createTRPCRouter({
  getUsersList: publicProcedure
    .input(paginationRequestSchema)
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const offset = (page - 1) * pageSize;

      const usersList = await db
        .select({
          ...getTableColumns(users),
          postsCount: sql<number>`count(${posts.id})`,
        })
        .from(users)
        .leftJoin(posts, sql`${users.id} = ${posts.userId}`)
        .groupBy(users.id)
        .limit(pageSize)
        .offset(offset);

      // Optionally get total count for pagination info
      const [{ count = 0 } = {}] = await db
        .select({
          count: sql<number>`count(*)::int`,
        })
        .from(users);

      return {
        users: usersList,
        pagination: getPagination(Number(count), page, pageSize),
      };
    }),
});
