import { createUser } from "./create.js";
import { isLogged } from "./is-logged.js";
import { login } from "./login.js";
import { logout } from "./logout.js";

export const userService = {
  createUser,
  login,
  logout,
  isLogged,
};
