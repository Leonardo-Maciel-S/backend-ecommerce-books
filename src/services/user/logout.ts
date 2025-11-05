import type { Request, Response } from "express";
import status from "http-status";

export async function logout(_: Request, res: Response) {
  res.clearCookie("token");

  return res.status(status.OK).json({ message: "Deslogado com sucesso!" });
}
