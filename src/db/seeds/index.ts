import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { bookTable } from "../schema/book.js";
import { userTable } from "../schema/user.js";

async function main() {
  const user: typeof userTable.$inferInsert = {
    name: "Leonardo",
    email: "leo@teste.com",
    password: "12345678",
  };

  const book: typeof bookTable.$inferInsert = {
    title: "A Jornada do Código",
    author: "Marcos Ribeiro",
    synopsis:
      "Um jovem desenvolvedor embarca em uma jornada para dominar o mundo do open source, enfrentando desafios, bugs e grandes descobertas.",
    priceInCents: 4990,
    coverImg: "https://example.com/covers/jornada-do-codigo.jpg",
    evaluation: 5,
  };

  try {
    const userReturn = await db.insert(userTable).values(user).returning();

    await db
      .insert(bookTable)
      .values({ ...book, userId: userReturn[0]?.id })
      .returning();

    if (userReturn[0]) {
      const bookReturn = await db
        .select()
        .from(bookTable)
        .where(eq(bookTable.userId, userReturn[0]?.id));

      console.log(bookReturn);
    }
  } catch (error) {
    console.log(error);
  }
}

main();
