import * as userModel from "../models/userModel.js";
import * as userService from "./userService.js";

export async function createProfessor(data) {
  const result = await userService.createUser({
    nome: data.nome,
    email: data.email
  });

  const user = await userModel.updateRoleById(
    result.user.id,
    "PROF"
  );

  return {
    user,
    tempPassword: result.tempPassword
  };
}

export async function getProfessors() {
  return await userModel.findByRole("PROF");
}

export async function getProfessorById(id) {
  const user = await userModel.findById(id);

  if (!user || user.role !== "PROF") {
    return null;
  }

  return user;
}

export async function updateProfessor(id, data) {
  return await userModel.updateById(id, data);
}

export async function deleteProfessor(id) {
  return await userModel.deleteById(id);
}
