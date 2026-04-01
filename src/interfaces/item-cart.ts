import type { InferType } from "yup";
import type { itemCartSchema } from "../schema/item-cart.js";

export type CartItem = InferType<typeof itemCartSchema>;
