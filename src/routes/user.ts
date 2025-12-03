import express from "express";
import { userService } from "../services/user/index.js";
import { userAddressBodyValidate } from "../middlewares/user-address-body-validate.js";
import { userAddressService } from "../services/address/index.js";
import { loginValidation } from "../middlewares/login-validation.js";
import { idValidation } from "../middlewares/id-validations.js";

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

userRouter.get(
  "/address/:id",
  idValidation,
  loginValidation,
  userAddressService.getById
);

userRouter.patch(
  "/address/:id",
  idValidation,
  loginValidation,
  userAddressBodyValidate,
  userAddressService.edit
);

userRouter.delete(
  "/address/:id",
  idValidation,
  loginValidation,
  userAddressService.deleteAddress
);

export { userRouter };
