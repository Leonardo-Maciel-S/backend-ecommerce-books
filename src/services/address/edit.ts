import type { Request, Response } from "express";
import type { UserAddressBody } from "../../interfaces/user-address.js";
import { db } from "../../db/index.js";
import { userAddressTable } from "../../db/schema/user-address.js";
import status from "http-status";
import { eq } from "drizzle-orm";

export async function edit(
  req: Request<{ id: string }, {}, UserAddressBody>,
  res: Response
) {
  const id = req.params.id;
  const userId = req.user?.id!;
  const body = req.body;

  try {
    const existAddressResponse = await db
      .select()
      .from(userAddressTable)
      .where(eq(userAddressTable.id, id));

    const existAddress = existAddressResponse[0];

    if (!existAddress) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Endereço não encontrado." });
    }

    if (existAddress.userId !== userId) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Você não pode editar endereço de outro usuário" });
    }

    const response = await db
      .update(userAddressTable)
      .set({
        ...body,
        userId,
      })
      .where(eq(userAddressTable.id, id))
      .returning();

    const address = response[0];

    if (!address) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Endereço não editado." });
    }

    res.status(status.CREATED).json({
      address,
    });
  } catch (e) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
