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

cartRouter.patch(
  "/set-default-address/:id",
  loginValidation,
  idValidation,
  cartService.selectDefaultCartAddress,
);

cartRouter.patch(
  "/increment/:id",
  loginValidation,
  idValidation,
  cartService.incrementItemCartById,
);

cartRouter.patch(
  "/decrease/:id",
  loginValidation,
  idValidation,
  cartService.decreaseItemCartById,
);

cartRouter.post(
  "/add-cart-item/:id",
  loginValidation,
  idValidation,
  cartService.addCartItem,
);

cartRouter.delete(
  "/delete/:id",
  loginValidation,
  idValidation,
  cartService.deleteItem,
);

export { cartRouter };
