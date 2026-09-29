import * as parentService from "../services/parentService.js";

export async function createParent(req, res) {
  try {
    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({ error: 'nome e email sÃ£o obrigatÃ³rios' });
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
      error: 'NÃ£o foi possÃ­vel criar o Parent'
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

export async function updateParent(req, res) {
  try {
    const { id } = req.params;
    const { nome, email } = req.body ?? {};

    const parentId = Number(id);

    if (!Number.isInteger(parentId)) {
      return res.status(400).json({
        error: "ID do Parent invÃ¡lido"
      });
    }

    if (!nome || !email) {
      return res.status(400).json({
        error: "nome e email sÃ£o obrigatÃ³rios"
      });
    }

    const parent = await parentService.updateParent(parentId, {
      nome,
      email
    });

    return res.status(200).json({
      message: "Parent atualizado com sucesso",
      data: parent
    });

  } catch (error) {
    return res.status(500).json({
      error: "NÃ£o foi possÃ­vel atualizar o Parent",
      details: error.message
    });
  }
}

export async function deleteParent(req, res) {
  try {
    const { id } = req.params;

    const parentId = Number(id);

    if (!Number.isInteger(parentId)) {
      return res.status(400).json({
        error: "ID do Parent invÃ¡lido"
      });
    }

    await parentService.deleteParent(parentId);

    return res.status(200).json({
      message: "Parent excluÃ­do com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      error: "NÃ£o foi possÃ­vel excluir o Parent",
      details: error.message
    });
  }
}
