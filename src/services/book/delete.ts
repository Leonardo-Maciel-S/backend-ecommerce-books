import type { Response, Request } from "express";
import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";
import { eq } from "drizzle-orm";
import status from "http-status";

export async function deleteBook(req: Request, res: Response) {
  const id = req.params.id;

  const user = req.user;

  try {
    const bookReturn = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, id!));

    const book = bookReturn[0];

    if (!book) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Livro não encontrado" });
    }

    if (book.userId !== user?.id) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: "Você não pode deletar livros de outra pessoa." });
    }

    const bookDeletedReturn = await db
      .delete(bookTable)
      .where(eq(bookTable.id, id!))
      .returning();

    return res.status(status.OK).json({ book: bookDeletedReturn[0] });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
