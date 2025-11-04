import type { Request, Response } from "express";
import { db } from "../../db/connect/index.js";
import { bookTable } from "../../db/schema/book.js";
import status from "http-status";

export async function getAll(_: Request, res: Response) {
  try {
    const books = await db.select().from(bookTable);

    res.status(status.ACCEPTED).send({ books });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send({ message: "Erro inesperado" });
  }
}
