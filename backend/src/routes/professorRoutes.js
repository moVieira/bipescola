import express from "express";

import {
  createProfessor,
  listProfessors,
  getProfessor,
  updateProfessor,
  deleteProfessor
} from "../controllers/teacherController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", createProfessor);
router.get("/", listProfessors);
router.get("/:id", getProfessor);
router.put("/:id", updateProfessor);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADM"),
  deleteProfessor
);

export default router;
