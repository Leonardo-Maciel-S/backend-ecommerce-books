import type { Request, Response } from "express";
import { bookSchema, type BookBody } from "../../schema/index.js";
import { status } from "http-status";
import { db } from "../../db/connect/index.js";
import { bookTable } from "../../db/schema/book.js";
import type { ValidationError } from "yup";

export async function createBook(
  req: Request<{}, {}, BookBody>,
  res: Response
) {
  const book = req.body;

  try {
    await bookSchema.validate(book);
  } catch (error) {
    const e = error as ValidationError;

    res.status(status.BAD_REQUEST).json({ message: e.errors[0] });
  }

  try {
    const response = await db.insert(bookTable).values(book).returning();
    res.status(status.CREATED).send({ book: response[0] });
  } catch (error) {
    console.log(error);
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send({ message: "Erro inesperado" });
  }
}
