import * as UserService from '../services/userService.js';

export async function createParent(req, res) {
  try {
    const { nome, email } = req.body;

    const result = await UserService.createParent({
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