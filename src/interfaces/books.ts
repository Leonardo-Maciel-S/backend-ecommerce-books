import type { InferType } from "yup";
import type { bookSchema } from "../schema/book.js";

export interface QueryBookParams {
  author?: string;
  category?: string;
}

export type Book = InferType<typeof bookSchema>;
export type BookBody = Omit<Book, "id">;
