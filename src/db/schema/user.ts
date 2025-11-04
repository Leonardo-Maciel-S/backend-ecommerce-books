import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
});
