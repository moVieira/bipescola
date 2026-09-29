import express from "express";

import {
  createAdm,
  listAdms,
  getAdm,
  updateAdm,
  deleteAdm
} from "../controllers/admController.js";

const router = express.Router();

// Criar ADM
router.post("/", createAdm);

// Listar ADMs
router.get("/", listAdms);

// Buscar ADM por ID
router.get("/:id", getAdm);

// Editar ADM
router.put("/:id", updateAdm);

// Deletar ADM
router.delete("/:id", deleteAdm);

export default router;
