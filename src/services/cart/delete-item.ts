import type { Request, Response } from "express";
import status from "http-status";
import { db } from "../../db/index.js";
import { cartItemTable, cartTable } from "../../db/schema/cart.js";
import { eq } from "drizzle-orm";

export async function deleteItem(req: Request<{ id: string }>, res: Response) {
  const user = req.user;
  const id = req.params.id;

  if (!user) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "Usuário não logado." });
  }

  try {
    const [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, user.id))
      .rightJoin(cartItemTable, eq(cartItemTable.cartId, cartTable.id));

    if (!cart) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Esse item não pertence ao carrinho do usuário." });
    }

    const [itemDeleted] = await db
      .delete(cartItemTable)
      .where(eq(cartItemTable.id, id))
      .returning();

    if (itemDeleted) {
      return res.status(status.OK).json({ itemDeleted });
    }

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Item não encontrado." });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
