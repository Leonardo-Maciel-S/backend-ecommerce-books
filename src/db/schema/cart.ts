import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const cartTable = pgTable("cart", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().unique(),
  userAddressId: uuid(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cartItemTable = pgTable("cartItem", {
  id: uuid().primaryKey().defaultRandom(),
  cartId: uuid().notNull(),
  bookId: uuid().notNull(),
  quantity: integer().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
