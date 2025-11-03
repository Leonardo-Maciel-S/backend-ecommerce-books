import { drizzle } from "drizzle-orm/neon-http";

console.log("url", process.env.DATABASE_URL);

export const db = drizzle(process.env.DATABASE_URL!);
