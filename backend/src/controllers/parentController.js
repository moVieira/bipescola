import * as parentService from "../services/parentService.js";

export async function createParent(req, res) {
  try {
    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({ error: 'nome e email são obrigatórios' });
    }

    const result = await parentService.createParent({ nome, email });

    return res.status(201).json({
      message: "Parent criado com sucesso",
      data: {
        id: result.user.id,
        nome: result.user.nome,
        email: result.user.email,
        role: result.user.role
      },
      tempPassword: result.tempPassword
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Não foi possível criar o Parent'
    });
  }
}

export async function listParents(req, res) {
  try {
    const parents = await parentService.getParents();

    return res.status(200).json({
      message: "Lista de pais retornada com sucesso",
      data: parents
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar pais",
      error: error.message
    });
  }
}