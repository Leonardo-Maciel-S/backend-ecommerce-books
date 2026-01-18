import { relations } from "drizzle-orm";
import { bookTable } from "../book.js";
import { userTable } from "../user.js";
import { commentsTable } from "../comments.js";

export const bookRelations = relations(bookTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [bookTable.userId],
    references: [userTable.id],
  }),

  comments: many(commentsTable),
}));
