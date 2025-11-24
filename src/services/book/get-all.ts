import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";
import status from "http-status";
import { and, ilike, or, sql } from "drizzle-orm";

export async function getAllBooks(req: Request, res: Response) {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let total;

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
    const totalBooks = await db
      .select({
        total: sql`count(*)`.mapWith(Number),
      })
      .from(bookTable)
      .where(and(...conditions));

    total = totalBooks[0]?.total;
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }

  const totalPages = (total && Math.ceil(total / limit)) || 1;

  try {
    const books = await await db
      .select()
      .from(bookTable)
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    res.status(status.OK).json({
      pagination: {
        totalBooks: total,
        totalPages,
        actualPage: page,
        limit,
      },
      books,
    });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
