import type { InferType } from "yup";
import type { commentSchema } from "../schema/comment.js";

export type Comment = InferType<typeof commentSchema>;
export type CommentBody = Required<Omit<Comment, "id" | "userId">>;
