import type { Request, Response } from "express";
import status from "http-status";

import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";

import { eq } from "drizzle-orm";
import type { BookBody } from "../../interfaces/books.js";

export async function patchBook(
  req: Request<{ id: string }, {}, BookBody>,
  res: Response
) {
  const id = req.params.id;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: "Envie pelo menos um campo para editar" });
  }

  try {
    const booksReturn = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, id));

    const book = booksReturn[0];

    if (!book) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Livro não encontrado" });
    }

    const newBook = await db
      .update(bookTable)
      .set({
        ...body,
      })
      .where(eq(bookTable.id, book.id))
      .returning();

    res.json({ book: newBook[0] });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
