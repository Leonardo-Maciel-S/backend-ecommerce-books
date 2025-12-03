import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import status from "http-status";
import { eq } from "drizzle-orm";
import { userAddressTable } from "../../db/schema/user-address.js";

export async function getById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const [address] = await db
      .select()
      .from(userAddressTable)
      .where(eq(userAddressTable.id, id!));

    res.status(status.OK).json({ address });
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado" });
  }
}
