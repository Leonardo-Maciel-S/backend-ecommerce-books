import type { InferType } from "yup";
import type { userSchema } from "../schema/user.js";

export type User = InferType<typeof userSchema>;
export type CreateUserBody = Omit<User, "id">;
export type LoginUserBody = Omit<User, "id" | "name">;
export type UserEditBody = Partial<CreateUserBody>;
