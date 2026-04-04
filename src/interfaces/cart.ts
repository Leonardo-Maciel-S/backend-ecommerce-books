import type { InferType } from "yup";
import type { cartSchema } from "../schema/cart.js";

export type Cart = InferType<typeof cartSchema>;
