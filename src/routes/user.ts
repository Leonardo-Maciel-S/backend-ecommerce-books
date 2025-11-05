import express from "express";
import { userService } from "../services/user/index.js";

const userRouter = express.Router();

userRouter.post("/register", userService.createUser);
userRouter.post("/login", userService.login);
userRouter.post("/logout", userService.logout);

export { userRouter };
