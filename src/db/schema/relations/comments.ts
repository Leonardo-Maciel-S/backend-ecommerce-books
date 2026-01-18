import { relations } from "drizzle-orm";
import { userTable } from "../user.js";
import { commentsTable } from "../comments.js";
import { bookTable } from "../book.js";

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [commentsTable.userId],
    references: [userTable.id],
  }),

  book: one(bookTable, {
    fields: [commentsTable.bookId],
    references: [bookTable.id],
  }),
}));
