import { createComment } from "./create.js";
import { getAllCommentsByBookId } from "./get-all-by-book-id.js";

export const commentService = {
  createComment,
  getAllCommentsByBookId,
};
