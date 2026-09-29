import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userModel from "../models/userModel.js";

function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

export async function createUser({ nome, email }) {
  const tempPassword = generatePassword();

  const hash = await bcrypt.hash(tempPassword, 10);

  const user = await userModel.create({
    nome,
    email,
    senha: hash,
    firstLogin: true
  });

  return {
    user,
    tempPassword
  };
}

export async function loginUser({ email, senha }) {
  const user = await userModel.findByEmail(email);

  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const passwordMatch = await bcrypt.compare(senha, user.senha);

  if (!passwordMatch) {
    throw new Error("Email ou senha inválidos");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role
    }
  };
}

export async function getUsers() {
  return await userModel.findAll();
}

export async function getUserById(id) {
  return await userModel.findById(id);
}

export async function updateUser(id, data) {
  return await userModel.updateById(id, data);
}

export async function deleteUser(id) {
  return await userModel.deleteById(id);
}
