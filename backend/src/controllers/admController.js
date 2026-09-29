import * as admService from "../services/admService.js";

export async function createAdm(req, res) {
  try {
    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({
        error: "nome e email são obrigatórios"
      });
    }

    const result = await admService.createAdm({
      nome,
      email
    });

    return res.status(201).json({
      message: "ADM criado com sucesso",
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

export async function listAdms(req, res) {
  try {
    const adms = await admService.getAdms();

    return res.status(200).json({
      message: "Lista de ADMs retornada com sucesso",
      data: adms
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível listar os ADMs",
      details: error.message
    });
  }
}

export async function getAdm(req, res) {
  try {
    const admId = Number(req.params.id);

    if (!Number.isInteger(admId)) {
      return res.status(400).json({
        error: "ID do ADM inválido"
      });
    }

    const adm = await admService.getAdms().then(adms =>
      adms.find(user => Number(user.id) === admId)
    );

    if (!adm) {
      return res.status(404).json({
        error: "ADM não encontrado"
      });
    }

    return res.status(200).json({
      message: "ADM encontrado com sucesso",
      data: adm
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível buscar o ADM",
      details: error.message
    });
  }
}

export async function updateAdm(req, res) {
  try {
    const admId = Number(req.params.id);

    if (!Number.isInteger(admId)) {
      return res.status(400).json({
        error: "ID do ADM inválido"
      });
    }

    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({
        error: "nome e email são obrigatórios"
      });
    }

    const existingAdms = await admService.getAdms();
    const existingAdm = existingAdms.find(
      user => Number(user.id) === admId
    );

    if (!existingAdm) {
      return res.status(404).json({
        error: "ADM não encontrado"
      });
    }

    const adm = await admService.updateAdm(admId, {
      nome,
      email
    });

    return res.status(200).json({
      message: "ADM atualizado com sucesso",
      data: adm
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível atualizar o ADM",
      details: error.message
    });
  }
}

export async function deleteAdm(req, res) {
  try {
    const admId = Number(req.params.id);

    if (!Number.isInteger(admId)) {
      return res.status(400).json({
        error: "ID do ADM inválido"
      });
    }

    const existingAdms = await admService.getAdms();
    const existingAdm = existingAdms.find(
      user => Number(user.id) === admId
    );

    if (!existingAdm) {
      return res.status(404).json({
        error: "ADM não encontrado"
      });
    }

    const deleted = await admService.deleteAdm(admId);

    if (!deleted) {
      return res.status(404).json({
        error: "ADM não encontrado"
      });
    }

    return res.status(200).json({
      message: "ADM excluído com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível excluir o ADM",
      details: error.message
    });
  }
}
