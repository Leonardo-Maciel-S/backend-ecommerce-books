import {
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const bookTable = pgTable("book", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  author: text().notNull(),
  synopsis: text(),
  priceInCents: integer().notNull(),
  coverImg: text(),
  evaluation: real(),
  userId: uuid(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});
