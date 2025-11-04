import { db } from "./../connect/index.js";
import { bookTable } from "../schema/book.js";

async function main() {
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
    const res = await db.insert(bookTable).values(book).returning();

    console.log(res);
  } catch (error) {}
}

main();
