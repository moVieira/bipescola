import express from "express";

import {
  createAdm,
  listAdms,
  getAdm,
  updateAdm,
  deleteAdm
} from "../controllers/admController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", createAdm);
router.get("/", listAdms);
router.get("/:id", getAdm);
router.put("/:id", updateAdm);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADM"),
  deleteAdm
);

export default router;
