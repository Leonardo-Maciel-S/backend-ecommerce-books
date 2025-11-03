import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const bookTable = pgTable("book", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  author: text().notNull(),
  synopsis: text().notNull(),
  priceInCents: integer().notNull(),
  coverImg: text(),
  evaluation: integer(),
});
