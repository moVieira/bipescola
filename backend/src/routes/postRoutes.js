import express from "express";

import {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADM", "PROF"),
  createPost
);

router.get(
  "/",
  authMiddleware,
  listPosts
);

router.get(
  "/:id",
  authMiddleware,
  getPost
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADM", "PROF"),
  updatePost
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADM", "PROF"),
  deletePost
);

export default router;
