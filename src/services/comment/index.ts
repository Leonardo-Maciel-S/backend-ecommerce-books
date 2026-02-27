import { createComment } from "./create.js";
import { deleteById } from "./delete-by-id.js";
import { editComment } from "./edit.js";
import { getAllCommentsByBookId } from "./get-all-by-book-id.js";

export const commentService = {
  createComment,
  getAllCommentsByBookId,
  deleteById,
  editComment,
};
