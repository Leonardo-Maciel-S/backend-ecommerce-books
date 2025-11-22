import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";
import status from "http-status";
import { and, ilike, or } from "drizzle-orm";

export async function getAllBooks(req: Request, res: Response) {
  const search = req.query.search || "";

  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(bookTable.title, `%${search}%`),
        ilike(bookTable.author, `%${search}%`)
      )
    );
  }

  try {
    const books = await await db
      .select()
      .from(bookTable)
      .where(and(...conditions));

    res.status(status.OK).json({ books });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
