import express from "express";
import { listStudents } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", listStudents);

export default router;