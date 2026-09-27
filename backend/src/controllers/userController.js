import { createUser as createUserService } from '../services/userService.js';

export async function createUser(req, res) {
  try {
    const { nome, email, role } = req.body ?? {};

    if (!nome || !email || !role) {
      return res.status(400).json({ error: 'nome, email e role são obrigatórios' });
    }

    if (typeof role === 'string' && role.toUpperCase() === 'PARENT') {
      return res.status(400).json({ error: 'Parents devem ser criados pela rota /api/parents' });
    }

    const result = await createUserService({
      nome,
      email,
      role
    });

    return res.status(201).json({
      message: 'Conta criada',
      tempPassword: result.tempPassword
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}