# 🏫 BipEscola

<p align="center">
  <strong>Sistema de Controle de Presença Escolar</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
</p>

## 📖 Sobre o projeto

O **BipEscola** é um sistema desenvolvido para auxiliar no controle de entrada e saída de alunos em uma escola municipal.

A proposta é permitir o registro da movimentação dos alunos por meio de **QR Code** ou **confirmação manual**, além de possibilitar consultas e gerenciamento das informações escolares.

O projeto está sendo desenvolvido de forma incremental, começando pela estruturação do backend e do banco de dados.

## 🛠️ Tecnologias

### Backend
- Node.js
- Express
- MySQL
- mysql2
- JavaScript
- JWT
- Bcrypt

### Frontend
- React Native
- Expo

### Desenvolvimento
- Git
- GitHub

## 🗄️ Banco de dados

O banco de dados foi modelado utilizando princípios de normalização até a **3ª Forma Normal (3FN)**.

Atualmente, a estrutura principal conta com:

- `TURMAS`
- `USERS`
- `ALUNOS`
- `QR_CODES`
- `REGISTROS_MOVIMENTACAO`

A modelagem utiliza:

- Chaves primárias e estrangeiras;
- Integridade referencial;
- Índices para otimização de consultas;
- Relacionamentos entre usuários, alunos, turmas e registros de movimentação.

[📚 Ver documentação completa do banco](./docs/DATABASE.md)

## 👨‍💻 Minha contribuição

Estou participando ativamente do desenvolvimento do projeto, com foco inicial no **backend e banco de dados**.

Entre as implementações realizadas:

- Estruturação e integração do backend com o banco de dados;
- Modelagem do banco de dados;
- Criação das tabelas necessárias para o sistema;
- Implementação das tabelas de presença e publicações;
- Estruturação inicial da API;
- Desenvolvimento da estrutura MVC.

O histórico de commits do projeto registra minha participação através do usuário **moVieira**.

## 📈 Desenvolvimento

O projeto está sendo desenvolvido de forma incremental.

### ✅ Implementado

- [x] Modelagem inicial do banco de dados
- [x] Normalização do banco até 3FN
- [x] Estrutura inicial do Express
- [x] Integração backend + MySQL
- [x] Estrutura MVC
- [x] Estrutura de tabelas do sistema
- [x] Endpoint inicial para cadastro de responsável

### 🚧 Em desenvolvimento

- [ ] Autenticação com JWT
- [ ] Gestão de alunos
- [ ] Registro de presença via QR Code
- [ ] Registro manual de presença
- [ ] Consulta de histórico
- [ ] Relatórios
- [ ] Aplicativo mobile
- [ ] Testes automatizados

## 🎯 Objetivos

O projeto busca aplicar conhecimentos de desenvolvimento de software em um problema real, trabalhando desde a **modelagem dos dados** até a construção do backend e, posteriormente, da aplicação mobile.

---

## 👨‍💻 Desenvolvedor

**Moisés Freire**

GitHub: [@moVieira](https://github.com/moVieira)
