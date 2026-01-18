import { pgTable, real, text, uuid } from "drizzle-orm/pg-core";

export const commentsTable = pgTable("comments", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull(),
  bookId: uuid().notNull(),
  userName: text(),
  evaluation: real(),
  text: text(),
});
