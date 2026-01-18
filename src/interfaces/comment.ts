import type { InferType } from "yup";
import type { comment } from "../schema/comment.js";

export type Comment = InferType<typeof comment>;
export type CommentBody = Omit<Comment, "id" | "userId">;
