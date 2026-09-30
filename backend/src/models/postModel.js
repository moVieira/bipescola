import { query } from "../database/db.js";

export async function createPost({ titulo, conteudo, autor_id }) {
  const sql = `
    INSERT INTO posts
      (titulo, conteudo, autor_id)
    VALUES (?, ?, ?)
  `;

  const result = await query(sql, [
    titulo,
    conteudo,
    autor_id
  ]);

  return await findById(result.insertId);
}

export async function findAll() {
  const sql = `
    SELECT
      p.id,
      p.titulo,
      p.conteudo,
      p.autor_id,
      u.nome AS autor_nome,
      p.data_criacao,
      p.data_atualizacao
    FROM posts p
    INNER JOIN users u ON u.id = p.autor_id
    ORDER BY p.data_criacao DESC
  `;

  return await query(sql);
}

export async function findById(id) {
  const sql = `
    SELECT
      p.id,
      p.titulo,
      p.conteudo,
      p.autor_id,
      u.nome AS autor_nome,
      p.data_criacao,
      p.data_atualizacao
    FROM posts p
    INNER JOIN users u ON u.id = p.autor_id
    WHERE p.id = ?
  `;

  const results = await query(sql, [id]);

  return results.length > 0 ? results[0] : null;
}

export async function updatePost(id, { titulo, conteudo }) {
  const sql = `
    UPDATE posts
    SET
      titulo = ?,
      conteudo = ?,
      data_atualizacao = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  await query(sql, [
    titulo,
    conteudo,
    id
  ]);

  return await findById(id);
}

export async function deletePost(id) {
  const sql = `
    DELETE FROM posts
    WHERE id = ?
  `;

  const result = await query(sql, [id]);

  return result.affectedRows > 0;
}
