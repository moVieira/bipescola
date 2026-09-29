import express from "express";

import {
  createProfessor,
  listProfessors,
  getProfessor,
  updateProfessor,
  deleteProfessor
} from "../controllers/teacherController.js";

const router = express.Router();

// Criar professor
router.post("/", createProfessor);

// Listar professores
router.get("/", listProfessors);

// Buscar professor por ID
router.get("/:id", getProfessor);

// Editar professor
router.put("/:id", updateProfessor);

// Deletar professor
router.delete("/:id", deleteProfessor);

export default router;
