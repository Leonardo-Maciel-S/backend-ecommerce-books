import type { Request, Response } from "express";
import status from "http-status";
import { db } from "../../db/index.js";
import { cartItemTable, cartTable } from "../../db/schema/cart.js";
import { eq } from "drizzle-orm";
import { bookTable } from "../../db/schema/book.js";

export async function getAllItemByCartId(req: Request, res: Response) {
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
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Usuário ainda não possui carrinho." });
    }

    const cartItems = await db
      .select({
        cartItem: cartItemTable,
        book: {
          id: bookTable.id,
          title: bookTable.title,
          coverImg: bookTable.coverImg,
          priceInCents: bookTable.priceInCents,
        },
      })
      .from(cartItemTable)
      .where(eq(cartItemTable.cartId, cart.id))
      .leftJoin(bookTable, eq(bookTable.id, cartItemTable.bookId));

    return res.status(status.CREATED).json({ cartItems });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
