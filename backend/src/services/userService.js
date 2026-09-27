import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";

function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

export async function createUser({ nome, email, role }) {

  const tempPassword = generatePassword();

  const hash = await bcrypt.hash(tempPassword, 10);

  const user = await userModel.create({
    nome,
    email,
    senha: hash,
    role,
    firstLogin: true
  });

  return {
    user,
    tempPassword
  };
}
