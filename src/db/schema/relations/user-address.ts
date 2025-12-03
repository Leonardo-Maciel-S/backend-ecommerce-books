import { relations } from "drizzle-orm";
import { userAddressTable } from "../user-address.js";
import { userTable } from "../user.js";

export const userAddressRelations = relations(userAddressTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userAddressTable.userId],
    references: [userTable.id],
  }),
}));
