import express from "express";
import { cartService } from "../services/cart/index.js";
import { loginValidation } from "../middlewares/login-validation.js";
import { idValidation } from "../middlewares/id-validations.js";

const cartRouter = express.Router();

cartRouter.get("/", loginValidation, cartService.getCartByUserId);
cartRouter.get(
  "/all-cart-item",
  loginValidation,
  cartService.getAllItemByCartId,
);

cartRouter.post(
  "/increment/:id",
  loginValidation,
  idValidation,
  cartService.incrementItemCartById,
);

cartRouter.post(
  "/add-cart-item/:id",
  loginValidation,
  idValidation,
  cartService.addCartItem,
);

export { cartRouter };
