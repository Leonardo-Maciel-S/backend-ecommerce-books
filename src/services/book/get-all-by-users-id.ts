import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";
import status from "http-status";
import { eq } from "drizzle-orm";

export async function getAllByUserId(req: Request, res: Response) {
  const id = req.user?.id;

  if (!id) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "Usuário não logado." });
  }

  try {
    const books = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.userId, id!));

    if (books.length === 0) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: "Nenhum livro encontrado" });
    }

    res.status(status.OK).json({ books });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
