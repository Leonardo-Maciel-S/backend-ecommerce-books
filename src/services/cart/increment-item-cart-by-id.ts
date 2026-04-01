import type { Request, Response } from "express";
import status from "http-status";
import { db } from "../../db/index.js";
import { cartItemTable } from "../../db/schema/cart.js";
import { eq } from "drizzle-orm";

export async function incrementItemCartById(
  req: Request<{ id: string }>,
  res: Response,
) {
  const user = req.user;
  const id = req.params.id;

  if (!user) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "Usuário não logado." });
  }

  try {
    const [cartItem] = await db
      .select()
      .from(cartItemTable)
      .where(eq(cartItemTable.id, id));

    if (!cartItem) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Item não está no carrinho" });
    }

    const [newCartItem] = await db
      .update(cartItemTable)
      .set({ quantity: cartItem.quantity + 1 })
      .where(eq(cartItemTable.id, id))
      .returning();

    return res.status(status.OK).json({ newCartItem });
  } catch (error) {}
}
