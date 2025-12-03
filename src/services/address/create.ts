import type { Request, Response } from "express";
import type { UserAddressBody } from "../../interfaces/user-address.js";
import { db } from "../../db/index.js";
import { userAddressTable } from "../../db/schema/user-address.js";
import status from "http-status";

export async function create(
  req: Request<{}, {}, UserAddressBody>,
  res: Response
) {
  const id = req.user?.id!;
  const body = req.body;

  try {
    const response = await db
      .insert(userAddressTable)
      .values({
        ...body,
        userId: id,
      })
      .returning();
    const address = response[0];

    if (!address) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Endereço não cadastrado." });
    }

    res.status(status.CREATED).json({
      address,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
