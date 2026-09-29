import * as studentService from "../services/studentService.js";

export async function createStudent(req, res) {
  try {
    const {
      matricula,
      nome,
      aniversario,
      turma_id,
      id_pai,
      faltas,
      status
    } = req.body ?? {};

    if (!matricula || !nome || turma_id === undefined) {
      return res.status(400).json({
        error: "matricula, nome e turma_id são obrigatórios"
      });
    }

    const turmaId = Number(turma_id);

    if (!Number.isInteger(turmaId)) {
      return res.status(400).json({
        error: "turma_id deve ser um número inteiro"
      });
    }

    let parentId = null;

    if (id_pai !== undefined && id_pai !== null) {
      parentId = Number(id_pai);

      if (!Number.isInteger(parentId)) {
        return res.status(400).json({
          error: "id_pai deve ser um número inteiro"
        });
      }
    }

    const student = await studentService.createStudent({
      matricula,
      nome,
      aniversario,
      turma_id: turmaId,
      id_pai: parentId,
      faltas,
      status
    });

    return res.status(201).json({
      message: "Aluno criado com sucesso",
      data: student
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}

export async function listStudents(req, res) {
  try {
    const students = await studentService.getStudents();

    return res.status(200).json({
      message: "Lista de alunos retornada com sucesso",
      data: students
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível listar os alunos",
      details: error.message
    });
  }
}

export async function getStudent(req, res) {
  try {
    const studentId = Number(req.params.id);

    if (!Number.isInteger(studentId)) {
      return res.status(400).json({
        error: "ID do aluno inválido"
      });
    }

    const student = await studentService.getStudentById(studentId);

    if (!student) {
      return res.status(404).json({
        error: "Aluno não encontrado"
      });
    }

    return res.status(200).json({
      message: "Aluno encontrado com sucesso",
      data: student
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível buscar o aluno",
      details: error.message
    });
  }
}

export async function listStudentsByParent(req, res) {
  try {
    const parentId = Number(req.params.id);

    if (!Number.isInteger(parentId)) {
      return res.status(400).json({
        error: "ID do pai inválido"
      });
    }

    const students = await studentService.getStudentsByParentId(parentId);

    return res.status(200).json({
      message: "Alunos do pai retornados com sucesso",
      data: students
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível listar os alunos do pai",
      details: error.message
    });
  }
}

export async function listStudentsByTurma(req, res) {
  try {
    const turmaId = Number(req.params.id);

    if (!Number.isInteger(turmaId)) {
      return res.status(400).json({
        error: "ID da turma inválido"
      });
    }

    const students = await studentService.getStudentsByTurmaId(turmaId);

    return res.status(200).json({
      message: "Alunos da turma retornados com sucesso",
      data: students
    });

  } catch (error) {
    return res.status(500).json({
      error: "Não foi possível listar os alunos da turma",
      details: error.message
    });
  }
}

export async function updateStudent(req, res) {
  try {
    const studentId = Number(req.params.id);

    if (!Number.isInteger(studentId)) {
      return res.status(400).json({
        error: "ID do aluno inválido"
      });
    }

    const {
      matricula,
      nome,
      aniversario,
      turma_id,
      id_pai,
      faltas,
      status
    } = req.body ?? {};

    if (!matricula || !nome || turma_id === undefined) {
      return res.status(400).json({
        error: "matricula, nome e turma_id são obrigatórios"
      });
    }

    const turmaId = Number(turma_id);

    if (!Number.isInteger(turmaId)) {
      return res.status(400).json({
        error: "turma_id deve ser um número inteiro"
      });
    }

    let parentId = null;

    if (id_pai !== undefined && id_pai !== null) {
      parentId = Number(id_pai);

      if (!Number.isInteger(parentId)) {
        return res.status(400).json({
          error: "id_pai deve ser um número inteiro"
        });
      }
    }

    const existingStudent = await studentService.getStudentById(studentId);

    if (!existingStudent) {
      return res.status(404).json({
        error: "Aluno não encontrado"
      });
    }

    const student = await studentService.updateStudent(studentId, {
      matricula,
      nome,
      aniversario,
      turma_id: turmaId,
      id_pai: parentId,
      faltas,
      status
    });

    return res.status(200).json({
      message: "Aluno atualizado com sucesso",
      data: student
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}

export async function deleteStudent(req, res) {
  try {
    const studentId = Number(req.params.id);

    if (!Number.isInteger(studentId)) {
      return res.status(400).json({
        error: "ID do aluno inválido"
      });
    }

    const existingStudent = await studentService.getStudentById(studentId);

    if (!existingStudent) {
      return res.status(404).json({
        error: "Aluno não encontrado"
      });
    }

    const deleted = await studentService.deleteStudent(studentId);

    if (!deleted) {
      return res.status(404).json({
        error: "Aluno não encontrado"
      });
    }

    return res.status(200).json({
      message: "Aluno excluído com sucesso"
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
}
