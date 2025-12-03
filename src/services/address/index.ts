import { create } from "./create.js";
import { deleteAddress } from "./delete.js";
import { edit } from "./edit.js";
import { getAll } from "./get-all.js";
import { getById } from "./get-by-id.js";

export const userAddressService = {
  create,
  edit,
  getAll,
  deleteAddress,
  getById,
};
