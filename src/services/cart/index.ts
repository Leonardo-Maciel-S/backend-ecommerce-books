import { addCartItem } from "./add-cart-item.js";
import { getAllItemByCartId } from "./get-all-item-by-cart-id.js";
import { getCartByUserId } from "./get-by-user-id.js";
import { incrementItemCartById } from "./increment-item-cart-by-id.js";

export const cartService = {
  getCartByUserId,
  addCartItem,
  getAllItemByCartId,
  incrementItemCartById,
};
