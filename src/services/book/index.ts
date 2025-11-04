import { createBook } from "./create.js";
import { deleteBook } from "./delete.js";
import { getAllBooks } from "./getAll.js";
import { patchBook } from "./patch.js";

export const bookService = {
  getAllBooks,
  createBook,
  patchBook,
  deleteBook,
};
