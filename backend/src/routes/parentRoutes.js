import express from 'express';
import { createParent, listParents } from '../controllers/parentController.js';

const router = express.Router();

/// Criar Parente
router.post('/', createParent);
router.get('/', listParents);

export default router;