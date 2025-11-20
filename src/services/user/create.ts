import type { Request, Response } from "express";
import type { CreateUserBody } from "../../interfaces/user.js";
import status from "http-status";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema/user.js";
import { eq } from "drizzle-orm";

import bcrypt from "bcrypt";
import { userSchema } from "../../schema/user.js";
import type { ValidationError } from "yup";

export async function createUser(
  req: Request<{}, {}, CreateUserBody>,
  res: Response
) {
  const body = req.body;

  try {
    await userSchema.validate(body);
  } catch (error) {
    const e = error as ValidationError;

    return res.status(status.BAD_REQUEST).json({ message: e.errors[0] });
  }

  try {
    const existUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, body.email));

    if (existUser[0]) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Email já cadastrado." });
    }
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }

  try {
    const salt = 10;

    const hash = await bcrypt.hash(body.password, salt);

    const user = await db
      .insert(userTable)
      .values({
        ...body,
        password: hash,
      })
      .returning();

    return res.status(status.CREATED).json({
      user: {
        id: user[0]?.id,
        name: user[0]?.name,
        email: user[0]?.email,
      },
      message: "Usuário criado com sucesso!",
    });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro inesperado." });
  }
}
