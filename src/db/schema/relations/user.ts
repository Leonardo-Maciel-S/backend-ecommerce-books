import { relations } from "drizzle-orm";
import { userTable } from "../user.js";
import { bookTable } from "../book.js";
import { userAddressTable } from "../user-address.js";

export const userRelations = relations(userTable, ({ many }) => ({
  book: many(bookTable),
  address: many(userAddressTable),
}));
