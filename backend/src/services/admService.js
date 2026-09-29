import * as userModel from "../models/userModel.js";
import * as userService from "./userService.js";

export async function createAdm(data) {
  const result = await userService.createUser({
    nome: data.nome,
    email: data.email
  });

  const user = await userModel.updateRoleById(
    result.user.id,
    "ADM"
  );

  return {
    user,
    tempPassword: result.tempPassword
  };
}

export async function getAdms() {
  return await userModel.findByRole("ADM");
}

export async function updateAdm(id, data) {
  return await userModel.updateById(id, data);
}

export async function deleteAdm(id) {
  return await userModel.deleteById(id);
}
