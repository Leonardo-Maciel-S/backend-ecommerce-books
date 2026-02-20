import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import status from "http-status";
import { eq, sql } from "drizzle-orm";
import { commentsTable } from "../../db/schema/comments.js";

export async function getAllCommentsByBookId(req: Request, res: Response) {
  const id = req.params.id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let total;

  try {
    const totalComments = await db
      .select({
        total: sql`count(*)`.mapWith(Number),
      })
      .from(commentsTable)
      .where(eq(commentsTable.id, id!));

    total = totalComments[0]?.total;
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }

  const totalPages = (total && Math.ceil(total / limit)) || 1;

  try {
    const comments = await await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.bookId, id!))
      .limit(limit)
      .offset(offset);

    res.status(status.OK).json({
      pagination: {
        totalComments: total,
        totalPages,
        actualPage: page,
        limit,
      },
      comments,
    });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
