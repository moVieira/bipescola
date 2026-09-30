import pool from './src/database/db.js';
import bcrypt from 'bcrypt';
import * as userService from './src/services/userService.js';
import * as userModel from './src/models/userModel.js';

async function seedDemo() {
  try {
    console.log("=========================================");
    console.log("   Semeando Dados para Demonstracao...");
    console.log("=========================================");

    // 1. Criar Turma
    let turmaId;
    try {
      const resultTurma = await pool.query("INSERT INTO turmas (nome) VALUES ('Turma 1')");
      turmaId = resultTurma[0].insertId;
      console.log("✅ Turma criada: Turma 1");
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        const [rows] = await pool.query("SELECT id FROM turmas LIMIT 1");
        turmaId = rows[0].id;
        console.log("ℹ️ Turma já existe, usando a existente.");
      } else throw e;
    }

    // 2. Criar Conta do Pai
    const emailPai = "pai@bipescola.com";
    let paiId;
    let senhaPai = "";
    try {
      const paiResult = await userService.createUser({ nome: "Joao Pai", email: emailPai });
      await userModel.updateRoleById(paiResult.user.id, "PARENT");
      paiId = paiResult.user.id;
      senhaPai = paiResult.tempPassword;
      console.log(`✅ Pai criado com sucesso! E-mail: ${emailPai} | Senha: ${senhaPai}`);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [emailPai]);
        paiId = rows[0].id;
        console.log(`ℹ️ Pai (${emailPai}) já existia no banco.`);
      } else throw e;
    }

    // 3. Criar Conta do Professor
    const emailProf = "prof@bipescola.com";
    let profId;
    let senhaProf = "";
    try {
      const profResult = await userService.createUser({ nome: "Maria Professora", email: emailProf });
      await userModel.updateRoleById(profResult.user.id, "PROF");
      profId = profResult.user.id;
      senhaProf = profResult.tempPassword;
      console.log(`✅ Professor criado com sucesso! E-mail: ${emailProf} | Senha: ${senhaProf}`);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [emailProf]);
        profId = rows[0].id;
        console.log(`ℹ️ Professor (${emailProf}) já existia no banco.`);
      } else throw e;
    }

    // 4. Criar Aluno vinculado ao Pai e a Turma
    try {
      await pool.query(
        "INSERT INTO alunos (matricula, nome, aniversario, turma_id, id_pai) VALUES (?, ?, ?, ?, ?)",
        ['MAT999', 'Filho do Joao', '2015-05-10', turmaId, paiId]
      );
      console.log("✅ Aluno (Filho do Joao) criado e vinculado ao Pai e à Turma!");
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        console.log("ℹ️ Aluno (MAT999) já existe.");
      } else throw e;
    }

    console.log("=========================================");
    console.log(" SEMENTE FINALIZADA! Você já pode logar!");
    console.log("=========================================");

  } catch (error) {
    console.error("Erro no processo de seed:", error);
  } finally {
    process.exit(0);
  }
}

seedDemo();
