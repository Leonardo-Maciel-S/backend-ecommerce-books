import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { bookTable } from "../../db/schema/book.js";
import status from "http-status";

export async function getAllBooks(_: Request, res: Response) {
  try {
    const books = await db.select().from(bookTable);

    res.status(status.OK).json({ books });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
