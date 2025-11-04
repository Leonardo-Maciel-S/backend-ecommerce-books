import type { Request, Response } from "express";
import status from "http-status";

import { db } from "../../db/connect/index.js";
import { bookTable } from "../../db/schema/book.js";
import type { BookBody } from "../../schema/index.js";

import { eq } from "drizzle-orm";

export async function patchBook(
  req: Request<{ id: string }, {}, BookBody>,
  res: Response
) {
  const id = req.params.id;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res
      .status(status.BAD_REQUEST)
      .send({ message: "Envie pelo menos um campo para editar" });
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
        .send({ message: "Livro não encontrado" });
    }

    const newBook = await db
      .update(bookTable)
      .set({
        ...body,
      })
      .where(eq(bookTable.id, book.id))
      .returning();

    res.send({ book: newBook[0] });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send({ message: "Erro inesperado" });
  }
}
