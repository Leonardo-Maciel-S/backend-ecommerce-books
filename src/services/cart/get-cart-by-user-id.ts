import type { Request, Response } from "express";
import status from "http-status";
import { db } from "../../db/index.js";
import { cartTable } from "../../db/schema/cart.js";
import { eq } from "drizzle-orm";

export async function getCartByUserId(req: Request, res: Response) {
  const user = req.user;

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
      const [newCart] = await db
        .insert(cartTable)
        .values({
          userId: user.id,
          userAddressId: null,
        })
        .returning();

      return res.status(status.OK).json({ cart: newCart });
    }

    return res.status(status.OK).json({ cart });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
}
