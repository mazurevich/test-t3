import { type Pagination } from "./types";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";

export const getPagination = (
  count: number,
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Pagination => {
  const totalPages = Math.ceil(count / pageSize);
  return { count, page, pageSize, totalPages };
};
