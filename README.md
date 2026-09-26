<div align="center">
  <h1>🏫 BipEscola</h1>
  <p><strong>Sistema de Controle de Presença Escolar</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="ExpressJS" />
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </p>
  
  <p>Sistema completo para registrar e gerenciar entrada/saída de alunos em escola municipal via QR Code ou confirmação manual.</p>
</div>

---

## 📖 Sumário
- [Visão Geral](#-visão-geral)
- [Stack Tecnológico](#-stack-tecnológico)
- [Como Executar](#-como-executar)
- [Permissões por Perfil](#-permissões-por-perfil)
- [Status de Desenvolvimento](#-status-de-desenvolvimento)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Banco de Dados](#-banco-de-dados)
- [Documentação da API](#-documentação-da-api)

---

## 🎯 Visão Geral

O **BipEscola** automatiza o registro de presença escolar oferecendo dois métodos práticos:
1. **📱 QR Code:** Leitura rápida quando o aluno entra ou sai da escola.
2. **✅ Confirmação Manual:** Lista interativa com checkboxes para confirmar a presença de vários alunos simultaneamente.

### Perfis de Usuário (Roles)
- 👤 **PARENT (Pais/Responsáveis):** Acesso restrito. Visualizam apenas as informações e frequência de seus próprios filhos.
- 👨‍🏫 **PROF (Professores/Coordenadores):** Visão de turmas, podem registrar presenças e gerar relatórios.
- 🛠️ **ADM (Administradores):** Acesso total e irrestrito ao sistema e configurações.

---

## 💻 Stack Tecnológico

**Backend:**
- Node.js + Express 5.2.1
- MySQL 2 (`mysql2/promise`)
- Autenticação com JWT
- Criptografia de senhas com Bcrypt

**Principais Dependências:**
```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mysql2": "^3.24.4"
}
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js v18+
- MySQL 8.0+
- npm ou yarn

### 🖥️ Executando o Backend

1. **Crie o banco de dados**
```bash
mysql -u root -p < database.sql
```

2. **Instale as dependências e configure o ambiente**
```bash
cd backend
npm install
```
Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=bipescola
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
```

3. **Inicie o servidor**
```bash
npm start
```
O servidor estará rodando em: `http://localhost:3000`

### 📱 Executando o Frontend (Aplicativo Mobile)

O frontend foi construído utilizando **React Native com Expo**. Para rodar no emulador ou no seu celular físico:

1. **Acesse a pasta do aplicativo e instale as dependências**
```bash
cd ../mobile
npm install
```

2. **Inicie o Expo**
```bash
npm start
```

3. **Inicie o aplicativo**
Após rodar o comando acima, um menu com QR Code aparecerá no terminal. Você pode:
- **Ler o QR Code** com o aplicativo [Expo Go](https://expo.dev/go) no seu celular.
- Pressionar `a` para abrir no emulador **Android**.
- Pressionar `i` para abrir no simulador **iOS**.

---

## 🔐 Permissões por Perfil

| Ação | PARENT | PROF | ADM |
|------|--------|------|-----|
| Ver alunos | Somente Filhos | Todos | Todos |
| Registrar presença | Somente Filhos | Todos | Todos |
| Gerar relatórios | Não | Sim | Sim |
| Gerenciar usuários | Não | Não | Sim |
| Gerenciar turmas | Não | Não | Sim |
| Deletar dados | Não | Não | Sim |

---

## 🚧 Status de Desenvolvimento

### ✅ Implementado
- [x] Modelagem do banco de dados (5 tabelas normalizadas)
- [x] Setup do Express
- [x] Estrutura padrão MVC
- [x] Endpoint de criação de pai/responsável

### ⏳ Pendente
- [ ] Autenticação JWT
- [ ] Fluxo de gestão de alunos
- [ ] Registro de presença via QR Code
- [ ] Registro de presença manual
- [ ] Consulta de histórico
- [ ] Geração de relatórios
- [ ] Desenvolvimento Frontend/Mobile
- [ ] Cobertura de testes

---

## 📂 Estrutura do Projeto

<details>
<summary><b>Clique para expandir</b></summary>

```text
bipescola/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── controllers/
│       │   ├── userController.js
│       │   ├── studentController.js
│       │   ├── parentController.js
│       │   ├── teacherController.js
│       │   ├── admController.js
│       │   └── schoolController.js
│       ├── models/
│       ├── services/
│       ├── routes/
│       ├── middlewares/
│       └── database/
├── database.sql
└── README.md
```
</details>

---

## 🗄️ Banco de Dados

<details>
<summary><b>Setup, Modelagem e Dados de Teste</b></summary>

### Setup
```bash
mysql -u root -p < database.sql
```

### Tabelas Principais
1. **TURMAS:** `id`, `nome`, `data_criacao`, `status`
2. **USERS:** `id`, `email`, `senha`, `nome`, `aniversario`, `role`, `ativo`
3. **ALUNOS:** `id`, `matricula`, `nome`, `turma_id`, `id_pai`, `faltas`, `status`
4. **QR_CODES:** `id`, `aluno_id`, `codigo_qr`, `ativo`
5. **REGISTROS_MOVIMENTACAO:** `id`, `aluno_id`, `turma_id`, `tipo_movimentacao`, `data_registro`, `hora_registro`, `data_hora_completa`

### Normalização
- **1FN:** Valores atômicos
- **2FN:** Sem dependências parciais
- **3FN:** Sem dependências transitivas
- **Integridade:** Foreign Keys com ON DELETE RESTRICT/CASCADE

### Índices Críticos
- `alunos.idx_matricula`: Busca rápida por QR Code
- `registros_movimentacao.idx_aluno_data`: Verificar presença diária
- `registros_movimentacao.idx_data_hora_completa`: Otimização de relatórios

### Dados de Teste (Mock)
**Usuários:**
- `pai@email.com` | `123456` | PARENT
- `prof@emei.com` | `prof123` | PROF
- `admin@emei.com` | `admin123` | ADM

**Alunos (MAT001-MAT006):**
- Turma 1º Ano A: João Silva Santos, Ana Paula Costa
- Turma 1º Ano B: Pedro Oliveira, Lucia Ferreira
- Turma 2º Ano A: Bruno Martins, Gabriela Rocha

**QR Codes:** `QR_001_MAT001` até `QR_006_MAT006`

</details>

<details>
<summary><b>SQL Essencial</b></summary>

**Registrar entrada:**
```sql
INSERT INTO registros_movimentacao 
(aluno_id, turma_id, tipo_movimentacao, data_registro, hora_registro, data_hora_completa)
SELECT a.id, a.turma_id, 'entrada', CURDATE(), CURTIME(), NOW()
FROM alunos a
WHERE a.matricula = 'MAT001' AND a.status = 'ativo';
```

**Histórico:**
```sql
SELECT data_hora_completa, tipo_movimentacao, observacoes
FROM registros_movimentacao
WHERE matricula = 'MAT001'
ORDER BY data_hora_completa DESC;
```

**Presentes hoje:**
```sql
SELECT a.nome, rm.hora_registro
FROM registros_movimentacao rm
JOIN alunos a ON rm.aluno_id = a.id
WHERE rm.data_registro = CURDATE()
  AND rm.id = (SELECT MAX(id) FROM registros_movimentacao rm2 
               WHERE rm2.aluno_id = rm.aluno_id AND rm2.data_registro = CURDATE())
  AND rm.tipo_movimentacao = 'entrada'
ORDER BY a.nome;
```

**Relatório diário:**
```sql
SELECT t.nome AS turma,
    COUNT(DISTINCT CASE WHEN rm.tipo_movimentacao = 'entrada' THEN rm.aluno_id END) AS presentes,
    COUNT(DISTINCT a.id) - COUNT(DISTINCT CASE WHEN rm.tipo_movimentacao = 'entrada' THEN rm.aluno_id END) AS ausentes
FROM alunos a
LEFT JOIN turmas t ON a.turma_id = t.id
LEFT JOIN registros_movimentacao rm ON a.id = rm.aluno_id AND rm.data_registro = CURDATE()
WHERE a.status = 'ativo'
GROUP BY t.id, t.nome;
```
</details>

---

## 🔌 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Usuários

#### `POST /users/parents`
Criar novo pai/responsável.

**Request:**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com"
}
```

**Response (201):**
```json
{
  "message": "Conta criada",
  "tempPassword": "ABC123"
}
```

<details>
<summary><b>Endpoints Pendentes (TO DO)</b></summary>

- `POST /attendance/qrcode`: Registrar entrada/saída via QR Code.
- `POST /attendance/manual`: Registrar presença em lote.
- `GET /attendance/historico/:matricula`: Ver histórico de um aluno.
- `GET /attendance/presentes-hoje`: Ver alunos presentes na escola hoje.
</details>

---

<div align="center">
  <sub>Licença ISC • BipEscola</sub>
</div>
