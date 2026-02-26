import type { Request, Response } from "express";
import { status } from "http-status";
import { db } from "../../db/index.js";
import type { ValidationError } from "yup";
import type { CommentBody } from "../../interfaces/comment.js";
import { commentSchema } from "../../schema/comment.js";
import { commentsTable } from "../../db/schema/comments.js";
import { bookTable } from "../../db/schema/book.js";
import { eq } from "drizzle-orm";

export async function editComment(
  req: Request<{ id: string }, {}, CommentBody>,
  res: Response,
) {
  const commentId = req.params.id;
  const comment = req.body;
  const user = req.user;

  if (!user) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "Usuário não logado." });
  }

  try {
    await commentSchema.validate(comment);
  } catch (error) {
    const e = error as ValidationError;

    return res.status(status.BAD_REQUEST).json({ message: e.errors[0] });
  }

  try {
    const book = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, comment.bookId!));

    if (!book[0]) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Livro não encontrado" });
    }

    if (user.id !== book[0].userId) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: "Esse usuário não é o criador do comentário." });
    }
  } catch (error) {
    const e = error as ValidationError;
    return res.status(status.BAD_REQUEST).json({ message: e.errors[0] });
  }

  try {
    const response = await db
      .update(commentsTable)
      .set({ ...comment })
      .where(eq(commentsTable.id, commentId))
      .returning();

    res.status(status.CREATED).json({ comment: response[0] });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
