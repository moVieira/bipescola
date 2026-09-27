import { query } from '../database/db.js';

export async function create({ nome, email, senha, role, firstLogin }) {
  const sql = 'INSERT INTO users (nome, email, senha, role, firstLogin, ativo) VALUES (?, ?, ?, ?, ?, ?)';
  const result = await query(sql, [nome, email, senha, role, firstLogin ? 1 : 0, 'sim']);

  return {
    id: result.insertId,
    nome,
    email,
    senha,
    role,
    firstLogin
  };
}

export async function findByEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const results = await query(sql, [email]);
  return results.length > 0 ? results[0] : null;
}

export async function findById(id) {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const results = await query(sql, [id]);
  return results.length > 0 ? results[0] : null;
}

export async function findByRole(role) {
  const sql = `
    SELECT id, nome, email, role, firstLogin, ativo
    FROM users
    WHERE role = ?
  `;

  return await query(sql, [role]);
}