import { query } from "../database/db.js";

export async function createAttendance({
  aluno_id,
  data,
  presente,
  registrado_por
}) {
  const sql = `
    INSERT INTO presencas
      (aluno_id, data, presente, registrado_por)
    VALUES (?, ?, ?, ?)
  `;

  const result = await query(sql, [
    aluno_id,
    data,
    presente ? 1 : 0,
    registrado_por
  ]);

  return await findById(result.insertId);
}

export async function findById(id) {
  const sql = `
    SELECT
      p.id,
      p.aluno_id,
      a.nome AS aluno_nome,
      p.data,
      p.presente,
      p.registrado_por,
      u.nome AS registrado_por_nome,
      p.data_registro
    FROM presencas p
    INNER JOIN alunos a ON a.id = p.aluno_id
    INNER JOIN users u ON u.id = p.registrado_por
    WHERE p.id = ?
  `;

  const results = await query(sql, [id]);

  return results.length > 0 ? results[0] : null;
}

export async function findByStudentId(aluno_id) {
  const sql = `
    SELECT
      p.id,
      p.aluno_id,
      a.nome AS aluno_nome,
      p.data,
      p.presente,
      p.registrado_por,
      u.nome AS registrado_por_nome,
      p.data_registro
    FROM presencas p
    INNER JOIN alunos a ON a.id = p.aluno_id
    INNER JOIN users u ON u.id = p.registrado_por
    WHERE p.aluno_id = ?
    ORDER BY p.data DESC
  `;

  return await query(sql, [aluno_id]);
}

export async function findByDate(data) {
  const sql = `
    SELECT
      p.id,
      p.aluno_id,
      a.nome AS aluno_nome,
      p.data,
      p.presente,
      p.registrado_por,
      u.nome AS registrado_por_nome,
      p.data_registro
    FROM presencas p
    INNER JOIN alunos a ON a.id = p.aluno_id
    INNER JOIN users u ON u.id = p.registrado_por
    WHERE p.data = ?
    ORDER BY a.nome
  `;

  return await query(sql, [data]);
}

export async function updateAttendance(id, { data, presente }) {
  const sql = `
    UPDATE presencas
    SET
      data = ?,
      presente = ?
    WHERE id = ?
  `;

  await query(sql, [
    data,
    presente ? 1 : 0,
    id
  ]);

  return await findById(id);
}

export async function deleteAttendance(id) {
  const sql = `
    DELETE FROM presencas
    WHERE id = ?
  `;

  const result = await query(sql, [id]);

  return result.affectedRows > 0;
}