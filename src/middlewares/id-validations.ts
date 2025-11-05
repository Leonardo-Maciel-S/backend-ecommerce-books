import type { NextFunction, Request, Response } from "express";
import { isValidUuid } from "../utils/is-valid-UUID.js";
import status from "http-status";

export function idValidation(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  if (!id) {
    return res.status(status.BAD_REQUEST).json({ message: "Id é obrigatório" });
  }

  const isIdValid = isValidUuid(id);

  if (!isIdValid) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: "Id deve ser do tipo uuid" });
  }

  next();
}
