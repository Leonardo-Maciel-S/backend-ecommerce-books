import type { NextFunction, Request, Response } from "express";
import { userAddressSchema } from "../schema/user-address.js";
import type { ValidationError } from "yup";
import status from "http-status";

export async function userAddressBodyValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  try {
    await userAddressSchema.validate(body);
  } catch (error) {
    const e = error as ValidationError;

    return res.status(status.BAD_REQUEST).json({ message: e.errors[0] });
  }

  next();
}
