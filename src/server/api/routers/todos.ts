import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "#/server/api/trpc";

type Todo = {
  id: number;
  name: string;
  is_done: boolean;
};

const todos: Todo[] = [
  { id: 1, name: "Buy groceries", is_done: false },
  { id: 2, name: "Finish the report", is_done: false },
];

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(() => todos),
  createTodo: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      const todo: Todo = {
        id: todos.length + 1,
        name: input.name,
        is_done: false,
      };
      todos.push(todo);
      return todo;
    }),
});
