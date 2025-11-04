import { relations } from "drizzle-orm";
import { userTable } from "../user.js";
import { bookTable } from "../book.js";

export const bookRelations = relations(bookTable, ({ one }) => ({
  user: one(userTable, {
    fields: [bookTable.userId],
    references: [userTable.id],
  }),
}));

export const userRelations = relations(userTable, ({ many }) => ({
  book: many(bookTable),
}));
