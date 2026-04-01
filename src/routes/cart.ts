import express from "express";
import { cartService } from "../services/cart/index.js";
import { loginValidation } from "../middlewares/login-validation.js";

const cartRouter = express.Router();

cartRouter.get("/", loginValidation, cartService.getCartByUserId);

export { cartRouter };
