import { relations } from "drizzle-orm";
import { cartItemTable, cartTable } from "../cart.js";
import { userTable } from "../user.js";
import { userAddressTable } from "../user-address.js";
import { bookTable } from "../book.js";

export const cartRelations = relations(cartTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [cartTable.userId],
    references: [userTable.id],
  }),
  userAddress: one(userAddressTable, {
    fields: [cartTable.userAddressId],
    references: [userAddressTable.id],
  }),

  cartItem: many(cartItemTable),
}));

export const cartItemRelations = relations(cartItemTable, ({ one, many }) => ({
  cart: one(cartTable, {
    fields: [cartItemTable.cartId],
    references: [cartTable.id],
  }),

  book: one(bookTable, {
    fields: [cartItemTable.bookId],
    references: [bookTable.id],
  }),
}));
