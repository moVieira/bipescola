import { createAdm } from './src/services/admService.js';
import pool from './src/database/db.js';

async function seed() {
  try {
    const data = {
      nome: "Administrador Padrao",
      email: "admin@bipescola.com"
    };
    
    console.log("Criando usuario admin padrao...");
    const result = await createAdm(data);
    
    console.log("-------------------------------------------------");
    console.log("Administrador criado com sucesso!");
    console.log(`Email: ${data.email}`);
    console.log(`Senha: ${result.tempPassword}`);
    console.log("-------------------------------------------------");
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log("=================================================");
      console.log("O admin (admin@bipescola.com) ja existe no banco de dados.");
      console.log("Se voce nao lembra a senha, pode apagar ele via SQL e rodar o script novamente.");
      console.log("=================================================");
    } else {
      console.error("Erro ao criar admin:", error);
    }
  } finally {
    process.exit(0);
  }
}

seed();
