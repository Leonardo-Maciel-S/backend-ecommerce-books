import type { InferType } from "yup";
import type { userAddressSchema } from "../schema/user-address.js";

export type UserAddress = InferType<typeof userAddressSchema>;
export type UserAddressBody = Omit<UserAddress, "id" | "userId">;
