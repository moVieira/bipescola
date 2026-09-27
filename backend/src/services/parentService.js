import * as userModel from "../models/userModel.js";
import * as userService from "./userService.js";

export async function createParent(data) {
  return await userService.createUser({
    ...data,
    role: "PARENT"
  });
}

export async function getParents() {
  return await userModel.findByRole("PARENT");
}

export async function updateParent(id, data) {
  return await userModel.updateById(id, data);
}

export async function deleteParent(id) {
  return await userModel.deleteById(id);
}