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
      title: "Primeiros passos com a linguagem Rust",
      author: "José Augusto N. G. Manzano",
      synopsis:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi eleifend, purus quis laoreet faucibus, ante augue malesuada mi, id rhoncus augue lorem eget elit. Ut sollicitudin sodales purus.",
      priceInCents: 69 * 100,
      coverImg: "https://s3.novatec.com.br/capas/9788575226834.jpg",
      evaluation: 4,
    },
    {
      title: "Programação em Baixo Nível",
      author: "Igor Zhirkov",
      synopsis:
        "Phasellus libero felis, blandit nec, commodo ut, imperdiet ut, nibh. Suspendisse potenti. Donec ullamcorper cursus dolor. Duis vitae ipsum. Maecenas dapibus hendrerit diam. Morbi varius, massa id pretium accumsan, nunc lorem congue libero, ut euismod metus libero id nulla.",
      priceInCents: 120 * 100,
      coverImg: "https://s3.novatec.com.br/capas/9788575226674.jpg",
      evaluation: 3,
    },
    {
      title: "Lógica de Programação e Algoritmos com JavaScript",
      author: "Edécio Fernando Iepsen",
      synopsis:
        "Duis cursus, dui non dictum tincidunt, wisi ipsum mollis wisi, nec ornare velit ipsum eget enim. In sed felis. Phasellus condimentum sodales nulla. Etiam orci leo, rutrum malesuada, congue vel, fringilla vitae, lorem. Pellentesque ligula.",
      priceInCents: 69 * 100,
      coverImg: "https://s3.novatec.com.br/capas/9788575226568.jpg",
      evaluation: 5,
    },
    {
      title: "PHP para quem conhece PHP - 5ª Edição",
      author: "Juliano Niederauer",
      synopsis:
        "Cras gravida. Mauris consequat aliquam leo. Aenean non tortor id metus aliquet consectetuer. Quisque sodales lectus ac orci. Donec eleifend fringilla mi. Vivamus vel massa. Aenean interdum pellentesque sem. Nulla pellentesque felis et tortor. Duis cursus, dui non dictum tincidunt, wisi ipsum mollis wisi, nec ornare velit ipsum eget enim. In sed felis. Phasellus condimentum sodales nulla. Etiam orci leo, rutrum malesuada, congue vel, fringilla vitae, lorem. Pellentesque ligula.",
      priceInCents: 99 * 100,
      coverImg: "https://s3.novatec.com.br/capas/9788575225905.jpg",
      evaluation: 2,
    },
    {
      title: "A Linguagem de Programação Go",
      author: "Alan A. Donovan, Brian W. Kernighan",
      synopsis:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi eleifend, purus quis laoreet faucibus, ante augue malesuada mi, id rhoncus augue lorem eget elit. Ut sollicitudin sodales purus. Phasellus libero felis, blandit nec, commodo ut,  ",
      priceInCents: 98 * 100,
      coverImg: "https://s3.novatec.com.br/capas/9788575225462.jpg",
      evaluation: 1,
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
