import express from 'express';

import {
    createParent,
    listParents,
    updateParent,
    deleteParent
} from '../controllers/parentController.js';

const router = express.Router();

// Criar Parent
router.post('/', createParent);

// Listar Parents
router.get('/', listParents);

// Editar Parent
router.put('/:id', updateParent);

// Deletar Parent
router.delete('/:id', deleteParent);

export default router;