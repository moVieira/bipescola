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