import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { userAddressTable } from "../../db/schema/user-address.js";
import { eq } from "drizzle-orm";
import status from "http-status";

export async function deleteAddress(
  req: Request<{ id: string }>,
  res: Response
) {
  const id = req.params.id;

  try {
    const [address] = await db
      .select()
      .from(userAddressTable)
      .where(eq(userAddressTable.id, id));

    if (!address) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Endereço com esse id não encontrado" });
    }

    const [deletedAddress] = await db
      .delete(userAddressTable)
      .where(eq(userAddressTable.id, id))
      .returning();

    if (!deletedAddress) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Erro ao deletar endereço." });
    }

    return res.status(status.OK).json({
      message: "Endereço excluído com sucesso!",
      address: deletedAddress,
    });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
