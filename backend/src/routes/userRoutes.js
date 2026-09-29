import express from 'express';

import {
  createUser,
  loginUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Login
router.post('/login', loginUser);

// Criar usuário
router.post('/', createUser);

// Listar usuários
router.get('/', listUsers);

// Buscar usuário por ID
router.get('/:id', getUser);

// Editar usuário
router.put('/:id', updateUser);

// Deletar usuário
router.delete('/:id', deleteUser);

export default router;
