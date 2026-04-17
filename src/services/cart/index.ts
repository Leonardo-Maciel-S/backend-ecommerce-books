import { addCartItem } from "./add-cart-item.js";
import { decreaseItemCartById } from "./decrease-item-cart-by-id.js";
import { deleteItem } from "./delete-item.js";
import { getAllItemByCartId } from "./get-all-item-by-cart-id.js";
import { getCartByUserId } from "./get-cart-by-user-id.js";
import { incrementItemCartById } from "./increment-item-cart-by-id.js";
import { selectDefaultCartAddress } from "./select-default-cart-address.js";

export const cartService = {
  getCartByUserId,
  addCartItem,
  getAllItemByCartId,
  incrementItemCartById,
  decreaseItemCartById,
  deleteItem,
  selectDefaultCartAddress,
};
