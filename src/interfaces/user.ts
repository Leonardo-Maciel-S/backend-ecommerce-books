import type { InferType } from "yup";
import type { userSchema } from "../schema/user.js";

export type User = InferType<typeof userSchema>;
export type UserBody = Omit<User, "id">;
export type UserEditBody = Partial<UserBody>;
