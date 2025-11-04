import { createBook } from "./create.js";
import { deleteBook } from "./delete.js";
import { getAllBooks } from "./getAll.js";
import { getAllByUserId } from "./getAllByUsersId.js";
import { patchBook } from "./patch.js";

export const bookService = {
  getAllBooks,
  getAllByUserId,
  createBook,
  patchBook,
  deleteBook,
};
