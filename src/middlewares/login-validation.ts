import type { NextFunction, Request, Response } from "express";
import status from "http-status";

import jwt from "jsonwebtoken";

export async function loginValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const jwt_secret = process.env.JWT_SECRET!;

  if (!token) {
    res.status(status.UNAUTHORIZED).json({ message: "Usuário não logado." });
  }

  await jwt.verify(token, jwt_secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(status.UNAUTHORIZED).json({
        message: "Token inválido",
      });
    }

    req.user = decoded;
  });

  next();
}
