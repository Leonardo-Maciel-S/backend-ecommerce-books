import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { bookTable } from "../schema/book.js";
import { userTable } from "../schema/user.js";

import bcrypt from "bcrypt";

async function main() {
  const passwordHash = await bcrypt.hash("12345678", 10);

  const user: (typeof userTable.$inferInsert)[] = [
    {
      name: "Leonardo",
      email: "leo@teste.com",
      password: passwordHash,
    },
  ];

  const books: (typeof bookTable.$inferInsert)[] = [
    {
      title: "A Jornada do Código",
      author: "Marcos Ribeiro",
      synopsis:
        "Um jovem desenvolvedor embarca em uma jornada para dominar o mundo do open source, enfrentando desafios, bugs e grandes descobertas.",
      priceInCents: 4990,
      coverImg: "https://example.com/covers/jornada-do-codigo.jpg",
      evaluation: 5,
    },
    {
      title: "Algoritmos Essenciais",
      author: "Ana Paula Santos",
      synopsis:
        "Uma exploração profunda dos principais algoritmos da computação, com exemplos práticos e análises de complexidade.",
      priceInCents: 5990,
      coverImg: "https://example.com/covers/algoritmos-essenciais.jpg",
      evaluation: 4.8,
    },
    {
      title: "Desenvolvimento Web Moderno",
      author: "Carlos Oliveira",
      synopsis:
        "Um guia completo sobre as tecnologias mais recentes no desenvolvimento web, incluindo frameworks e boas práticas.",
      priceInCents: 7990,
      coverImg: "https://example.com/covers/dev-web-moderno.jpg",
      evaluation: 4.9,
    },
    {
      title: "Clean Code: Código Limpo",
      author: "Roberto Silva",
      synopsis:
        "Aprenda as melhores práticas para escrever código limpo, manutenível e escalável, com exemplos em várias linguagens.",
      priceInCents: 6990,
      coverImg: "https://example.com/covers/clean-code.jpg",
      evaluation: 5,
    },
  ];
  try {
    const userReturn = await db.insert(userTable).values(user).returning();

    for (let book of books) {
      await db
        .insert(bookTable)
        .values({ ...book, userId: userReturn[0]?.id })
        .returning();
    }

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
