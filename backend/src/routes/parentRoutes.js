import express from 'express';

import {
  createParent,
  listParents,
  updateParent,
  deleteParent
} from '../controllers/parentController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', createParent);
router.get('/', listParents);
router.put('/:id', updateParent);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('ADM'),
  deleteParent
);

export default router;
