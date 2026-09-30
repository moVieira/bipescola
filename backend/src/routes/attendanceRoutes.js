import express from "express";

import {
  createAttendance,
  listAttendanceByStudent,
  listAttendanceByDate,
  getAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendanceController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADM", "PROF"),
  createAttendance
);

router.get(
  "/aluno/:id",
  authMiddleware,
  listAttendanceByStudent
);

router.get(
  "/data/:data",
  authMiddleware,
  listAttendanceByDate
);

router.get(
  "/:id",
  authMiddleware,
  getAttendance
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADM", "PROF"),
  updateAttendance
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADM"),
  deleteAttendance
);

export default router;