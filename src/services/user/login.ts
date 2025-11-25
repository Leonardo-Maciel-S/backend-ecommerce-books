import type { Request, Response } from "express";
import type { LoginUserBody } from "../../interfaces/user.js";
import status from "http-status";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema/user.js";
import { eq } from "drizzle-orm";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(
  req: Request<{}, {}, LoginUserBody>,
  res: Response
) {
  const body = req.body;
  const jwt_secret = process.env.JWT_SECRET!;

  if (!body.email || !body.password) {
    return res.status(status.BAD_REQUEST).json({
      message: "Email e senha são obrigatório",
    });
  }

  try {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, body.email));

    if (!user) {
      return res.status(status.BAD_REQUEST).json({
        message: "Email não cadastrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return res.status(status.BAD_REQUEST).json({
        message: "Senha incorreta.",
      });
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(userWithoutPassword, jwt_secret, {
      expiresIn: 1000 * 60 * 60,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "DEV" ? false : true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    return res.status(status.OK).json({
      user: userWithoutPassword,
      message: "Logado com sucesso!",
    });
  } catch (error) {
    console.log(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: "Erro inesperado.",
    });
  }
}
