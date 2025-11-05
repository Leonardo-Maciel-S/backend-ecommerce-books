import type { Request, Response } from "express";
import { bookSchema } from "../../schema/book.js";
import { status } from "http-status";
import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";
import type { ValidationError } from "yup";
import type { BookBody } from "../../interfaces/books.js";

export async function createBook(
  req: Request<{}, {}, BookBody>,
  res: Response
) {
  const book = req.body;
  const user = req.user;

  if (!user) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "Usuário não logado." });
  }

  try {
    await bookSchema.validate(book);
  } catch (error) {
    const e = error as ValidationError;

    res.status(status.BAD_REQUEST).json({ message: e.errors[0] });
  }

  try {
    const response = await db
      .insert(bookTable)
      .values({ ...book, userId: user.id })
      .returning();
    res.status(status.CREATED).json({ book: response[0] });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
