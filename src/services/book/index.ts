import { createBook } from "./create.js";
import { deleteBook } from "./delete.js";
import { getAllBooks } from "./get-all.js";
import { getAllByUserId } from "./get-all-by-users-id.js";
import { patchBook } from "./patch.js";
import { getById } from "./get-by-id.js";

export const bookService = {
  getAllBooks,
  getAllByUserId,
  createBook,
  patchBook,
  deleteBook,
  getById,
};
