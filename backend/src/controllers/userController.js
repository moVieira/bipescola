import * as userService from '../services/userService.js';

export async function createUser(req, res) {
  try {
    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({
        error: 'nome e email são obrigatórios'
      });
    }

    const result = await userService.createUser({
      nome,
      email
    });

    return res.status(201).json({
      message: 'Conta criada',
      data: {
        id: result.user.id,
        nome: result.user.nome,
        email: result.user.email,
        role: result.user.role
      },
      tempPassword: result.tempPassword
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, senha } = req.body ?? {};

    if (!email || !senha) {
      return res.status(400).json({
        error: 'email e senha são obrigatórios'
      });
    }

    const result = await userService.loginUser({
      email,
      senha
    });

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token: result.token,
      user: result.user
    });

  } catch (error) {
    return res.status(401).json({
      error: error.message
    });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await userService.getUsers();

    return res.status(200).json({
      message: 'Lista de usuários retornada com sucesso',
      data: users
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Não foi possível listar os usuários',
      details: error.message
    });
  }
}

export async function getUser(req, res) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        error: 'ID do usuário inválido'
      });
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    return res.status(200).json({
      message: 'Usuário encontrado com sucesso',
      data: user
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Não foi possível buscar o usuário',
      details: error.message
    });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        error: 'ID do usuário inválido'
      });
    }

    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({
        error: 'nome e email são obrigatórios'
      });
    }

    const existingUser = await userService.getUserById(userId);

    if (!existingUser) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    const user = await userService.updateUser(userId, {
      nome,
      email
    });

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      data: user
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Não foi possível atualizar o usuário',
      details: error.message
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        error: 'ID do usuário inválido'
      });
    }

    if (!req.user) {
      return res.status(401).json({
        error: 'Usuário não autenticado'
      });
    }

    if (req.user.role !== 'ADM') {
      return res.status(403).json({
        error: 'Somente ADM pode excluir usuários'
      });
    }

    if (Number(req.user.id) === userId) {
      return res.status(403).json({
        error: 'ADM não pode excluir a própria conta'
      });
    }

    const existingUser = await userService.getUserById(userId);

    if (!existingUser) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    const deleted = await userService.deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    return res.status(200).json({
      message: 'Usuário excluído com sucesso'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Não foi possível excluir o usuário',
      details: error.message
    });
  }
}
