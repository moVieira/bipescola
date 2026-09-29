import * as professorService from "../services/professorService.js";

export async function createProfessor(req, res) {
  try {
    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({
        error: "nome e email são obrigatórios"
      });
    }

    const result = await professorService.createProfessor({
      nome,
      email
    });

    return res.status(201).json({
      message: "Professor criado com sucesso",
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

export async function listProfessors(req, res) {
  try {
    const professors = await professorService.getProfessors();

    return res.status(200).json({
      message: "Lista de professores retornada com sucesso",
      data: professors
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível listar os professores",
      details: error.message
    });
  }
}

export async function getProfessor(req, res) {
  try {
    const professorId = Number(req.params.id);

    if (!Number.isInteger(professorId)) {
      return res.status(400).json({
        error: "ID do professor inválido"
      });
    }

    const professor = await professorService.getProfessorById(professorId);

    if (!professor) {
      return res.status(404).json({
        error: "Professor não encontrado"
      });
    }

    return res.status(200).json({
      message: "Professor encontrado com sucesso",
      data: professor
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível buscar o professor",
      details: error.message
    });
  }
}

export async function updateProfessor(req, res) {
  try {
    const professorId = Number(req.params.id);

    if (!Number.isInteger(professorId)) {
      return res.status(400).json({
        error: "ID do professor inválido"
      });
    }

    const { nome, email } = req.body ?? {};

    if (!nome || !email) {
      return res.status(400).json({
        error: "nome e email são obrigatórios"
      });
    }

    const existingProfessor =
      await professorService.getProfessorById(professorId);

    if (!existingProfessor) {
      return res.status(404).json({
        error: "Professor não encontrado"
      });
    }

    const professor = await professorService.updateProfessor(
      professorId,
      {
        nome,
        email
      }
    );

    return res.status(200).json({
      message: "Professor atualizado com sucesso",
      data: professor
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível atualizar o professor",
      details: error.message
    });
  }
}

export async function deleteProfessor(req, res) {
  try {
    const professorId = Number(req.params.id);

    if (!Number.isInteger(professorId)) {
      return res.status(400).json({
        error: "ID do professor inválido"
      });
    }

    const existingProfessor =
      await professorService.getProfessorById(professorId);

    if (!existingProfessor) {
      return res.status(404).json({
        error: "Professor não encontrado"
      });
    }

    const deleted =
      await professorService.deleteProfessor(professorId);

    if (!deleted) {
      return res.status(404).json({
        error: "Professor não encontrado"
      });
    }

    return res.status(200).json({
      message: "Professor excluído com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível excluir o professor",
      details: error.message
    });
  }
}
