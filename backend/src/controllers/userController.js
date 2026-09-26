import { createUser as createUserService } from '../services/userService.js';

export async function createUser(req, res) {
  try {
    const { nome, email } = req.body;

    const result = await createUserService({
      nome,
      email
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