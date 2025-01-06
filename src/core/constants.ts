import { z } from "zod";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 25;

export const paginationRequestSchema = z.object({
  page: z.number().optional().default(DEFAULT_PAGE),
  pageSize: z.number().optional().default(DEFAULT_PAGE_SIZE),
});
