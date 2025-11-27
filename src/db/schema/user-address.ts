import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userAddressTable = pgTable("user_address", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull(),
  number: integer(),
  street: text().notNull(),
  complement: text(),
  neighborhood: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  phone: text().notNull(),
  recipientName: text().notNull(),
  cpfOrCnpj: text().notNull(),
});
