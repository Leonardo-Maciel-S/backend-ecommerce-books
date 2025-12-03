import type { Request, Response } from "express";
import type { UserAddressBody } from "../../interfaces/user-address.js";
import { db } from "../../db/index.js";
import { userAddressTable } from "../../db/schema/user-address.js";
import status from "http-status";
import { eq } from "drizzle-orm";

export async function getAll(
  req: Request<{}, {}, UserAddressBody>,
  res: Response
) {
  const userId = req.user?.id!;

  try {
    const addresses = await db
      .select()
      .from(userAddressTable)
      .where(eq(userAddressTable.userId, userId));

    if (addresses.length === 0) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Endereços não encontrado." });
    }

    return res.status(status.OK).json({ addresses });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
