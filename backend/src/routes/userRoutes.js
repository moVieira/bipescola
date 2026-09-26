import express from 'express';
import { createParent } from '../controllers/parentController.js';

const router = express.Router();

/// Criar Parente
router.post('/parents', createParent);

/**
 * 
 * /// Criar Aluno
router.post();
/// Criar Professor
router.post();
/// Listar todos Cadastros PARENT
router.get();
/// Listar todos Cadastros TEACHER
router.get();
/// Listar todos Cadastros SCHOOL
router.get();
/// Listar todos Cadastros ADM
router.get();
/// Listar PARENT por ID
router.get();
/// Listar TEACHER por ID
router.get();
/// Listar SCHOOL por ID
router.get();

 * 
 */

export default router;