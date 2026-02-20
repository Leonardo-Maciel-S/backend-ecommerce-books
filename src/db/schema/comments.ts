import { sql } from "drizzle-orm";
import { pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const commentsTable = pgTable("comments", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull(),
  bookId: uuid().notNull(),
  userName: text(),
  evaluation: real(),
  text: text(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
});
