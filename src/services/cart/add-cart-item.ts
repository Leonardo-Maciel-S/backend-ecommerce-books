import type { Request, Response } from "express";
import status from "http-status";
import { db } from "../../db/index.js";
import { cartItemTable, cartTable } from "../../db/schema/cart.js";
import { eq } from "drizzle-orm";

export async function addCartItem(req: Request<{ id: string }>, res: Response) {
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
      .where(eq(cartTable.userId, user.id));

    if (!cart) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Usuário ainda não possui carrinho." });
    }

    const [cartItem] = await db
      .insert(cartItemTable)
      .values({
        cartId: cart.id,
        bookId: id,
        quantity: 1,
      })
      .returning();

    return res.status(status.CREATED).json({ cartItem });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
