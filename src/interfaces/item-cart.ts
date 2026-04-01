import type { InferType } from "yup";
import type { itemCartSchema } from "../schema/item-cart.js";

export type ItemCart = InferType<typeof itemCartSchema>;
