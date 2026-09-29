import express from 'express';

import {
  createUser,
  loginUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('ADM'),
  deleteUser
);

export default router;
