import express from "express";
import { userService } from "../services/user/index.js";
import { userAddressBodyValidate } from "../middlewares/user-address-body-validate.js";
import { userAddressService } from "../services/user-address/index.js";
import { loginValidation } from "../middlewares/login-validation.js";

const userRouter = express.Router();

userRouter.post("/register", userService.createUser);
userRouter.post("/login", userService.login);
userRouter.post("/logout", userService.logout);
userRouter.get("/is-logged", userService.isLogged);

userRouter.get("/address", loginValidation, userAddressService.getAll);
userRouter.post(
  "/address",
  loginValidation,
  userAddressBodyValidate,
  userAddressService.create
);

userRouter.patch(
  "/address/:id",
  loginValidation,
  userAddressBodyValidate,
  userAddressService.edit
);

export { userRouter };
