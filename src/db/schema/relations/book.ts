import { relations } from "drizzle-orm";
import { bookTable } from "../book.js";
import { userTable } from "../user.js";

export const bookRelations = relations(bookTable, ({ one }) => ({
  user: one(userTable, {
    fields: [bookTable.userId],
    references: [userTable.id],
  }),
}));
