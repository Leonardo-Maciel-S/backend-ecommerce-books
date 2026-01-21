import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import status from "http-status";
import { eq } from "drizzle-orm";
import { commentsTable } from "../../db/schema/comments.js";

export async function deleteById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const commentsReturn = await await db
      .delete(commentsTable)
      .where(eq(commentsTable.id, id!))
      .returning();

    res.status(status.OK).json({
      comment: commentsReturn[0],
    });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
