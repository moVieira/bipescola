import express from "express";

import {
  createStudent,
  listStudents,
  getStudent,
  listStudentsByParent,
  listStudentsByTurma,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

// Criar aluno
router.post("/", createStudent);

// Listar alunos
router.get("/", listStudents);

// Listar alunos por pai
router.get("/pai/:id", listStudentsByParent);

// Listar alunos por turma
router.get("/turma/:id", listStudentsByTurma);

// Buscar aluno por ID
router.get("/:id", getStudent);

// Editar aluno
router.put("/:id", updateStudent);

// Deletar aluno
router.delete("/:id", deleteStudent);

export default router;
