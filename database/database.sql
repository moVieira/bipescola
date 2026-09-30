-- ============================================================================
-- BANCO DE DADOS: SISTEMA DE CONTROLE DE ENTRADA E SAIDA DE ALUNOS
-- Sistema: BipEscola
-- Banco de Dados: MySQL
-- Normalizacao: 1FN, 2FN, 3FN
-- ============================================================================

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS bipescola DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bipescola;

-- ============================================================================
-- TABELA: TURMAS
-- Descricao: Armazena as turmas da escola unica
-- ============================================================================
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativa', 'inativa') DEFAULT 'ativa',
    INDEX idx_nome (nome),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABELA: USERS
-- Descricao: Armazena usuarios do sistema (professores, admin, pais)
-- Roles:
--   - PROF: Professor/Coordenacao
--   - ADM: Admin (acesso total)
--   - PARENT: Pais/responsaveis (veem apenas seus filhos)
-- ============================================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    aniversario DATE,
    role ENUM('PROF', 'ADM', 'PARENT') NOT NULL DEFAULT 'PARENT',
    firstLogin BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativo ENUM('sim', 'nao') DEFAULT 'sim',

    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABELA: ALUNOS
-- Descricao: Armazena informacoes dos alunos
-- Relacionamento: Um aluno pertence a uma turma
-- Normalizacao: Sem dados redundantes, chaves primaria e estrangeira corretas
-- ============================================================================
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    aniversario DATE,
    turma_id INT NOT NULL,
    id_pai INT,
    faltas INT DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo', 'transferido', 'evadido') DEFAULT 'ativo',

    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_pai) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,

    INDEX idx_matricula (matricula),
    INDEX idx_nome (nome),
    INDEX idx_turma_id (turma_id),
    INDEX idx_id_pai (id_pai),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABELA: QR_CODES
-- Descricao: Armazena relacao entre QR Codes e alunos
-- ============================================================================
CREATE TABLE qr_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    codigo_qr VARCHAR(255) NOT NULL UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativo ENUM('sim', 'nao') DEFAULT 'sim',

    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE ON UPDATE CASCADE,

    INDEX idx_codigo_qr (codigo_qr),
    INDEX idx_aluno_id (aluno_id),
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABELA: REGISTROS_MOVIMENTACAO
-- Descricao: Armazena registros de entrada e saida dos alunos
-- Normalizacao: Cada registro em linha separada, sem redundancia
-- ============================================================================
CREATE TABLE registros_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    tipo_movimentacao ENUM('entrada', 'saida') NOT NULL,
    data_registro DATE NOT NULL,
    hora_registro TIME NOT NULL,
    data_hora_completa DATETIME NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacoes VARCHAR(255),

    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE RESTRICT ON UPDATE CASCADE,

    INDEX idx_aluno_id (aluno_id),
    INDEX idx_turma_id (turma_id),
    INDEX idx_data_registro (data_registro),
    INDEX idx_tipo_movimentacao (tipo_movimentacao),
    INDEX idx_data_hora_completa (data_hora_completa),
    INDEX idx_aluno_data (aluno_id, data_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABELA: PRESENCAS
-- Descricao: Confirmacao manual de presenca diaria (metodo em lote/checkbox)
-- Diferenca de REGISTROS_MOVIMENTACAO: aqui eh um registro por aluno/dia,
-- usado quando o professor confirma presenca manualmente (sem QR Code)
-- ============================================================================
CREATE TABLE presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    data DATE NOT NULL,
    presente BOOLEAN NOT NULL DEFAULT TRUE,
    registrado_por INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (registrado_por) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,

    UNIQUE (aluno_id, data),
    INDEX idx_aluno_id (aluno_id),
    INDEX idx_data (data),
    INDEX idx_registrado_por (registrado_por)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABELA: POSTS
-- Descricao: Comunicados/avisos publicados por professores e administradores
-- ============================================================================
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (autor_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,

    INDEX idx_autor_id (autor_id),
    INDEX idx_data_criacao (data_criacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- ============================================================================
-- DADOS DE EXEMPLO PARA TESTES
-- ============================================================================
-- ============================================================================

-- Inserir turmas
INSERT INTO turmas (nome, status) VALUES
('1º Ano A', 'ativa'),
('1º Ano B', 'ativa'),
('2º Ano A', 'ativa');

-- Inserir usuarios do sistema
-- PARENT: pai@email.com / 123456
-- PROF: prof@emei.com / prof123
-- ADM: admin@emei.com / admin123
INSERT INTO users (email, senha, nome, aniversario, role, firstLogin, ativo) VALUES
('pai@email.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Maria Silva Santos', '1985-06-15', 'PARENT', true, 'sim'),
('prof@emei.com', '58e53f64b2b35524696f1d27f44f5c27', 'Professora Escola', '1990-03-20', 'PROF', true, 'sim'),
('admin@emei.com', '0192023a7bbd73250516f069df18b500', 'Coordenadora Escola', '1988-11-10', 'ADM', true, 'sim');

-- Inserir alunos
-- MAT001 e MAT002 sao filhos de Maria Silva (id_pai = 1)
INSERT INTO alunos (matricula, nome, aniversario, turma_id, id_pai, faltas, status) VALUES
('MAT001', 'Joao Silva Santos', '2022-03-15', 1, 1, 0, 'ativo'),
('MAT002', 'Ana Paula Costa', '2022-07-22', 1, 1, 0, 'ativo'),
('MAT003', 'Pedro Oliveira', '2022-05-10', 2, NULL, 0, 'ativo'),
('MAT004', 'Lucia Ferreira', '2022-11-28', 2, NULL, 0, 'ativo'),
('MAT005', 'Bruno Martins', '2021-02-14', 3, NULL, 0, 'ativo'),
('MAT006', 'Gabriela Rocha', '2021-09-30', 3, NULL, 0, 'ativo');

-- Inserir QR Codes
INSERT INTO qr_codes (aluno_id, codigo_qr, ativo) VALUES
(1, 'QR_001_MAT001', 'sim'),
(2, 'QR_002_MAT002', 'sim'),
(3, 'QR_003_MAT003', 'sim'),
(4, 'QR_004_MAT004', 'sim'),
(5, 'QR_005_MAT005', 'sim'),
(6, 'QR_006_MAT006', 'sim');

-- Inserir registros de movimentacao de exemplo
-- Data: 06 de setembro de 2024
INSERT INTO registros_movimentacao (aluno_id, turma_id, tipo_movimentacao, data_registro, hora_registro, data_hora_completa, observacoes) VALUES
(1, 1, 'entrada', '2024-09-06', '07:30:00', '2024-09-06 07:30:00', 'Entrada normal'),
(2, 1, 'entrada', '2024-09-06', '07:45:00', '2024-09-06 07:45:00', 'Entrada normal'),
(3, 2, 'entrada', '2024-09-06', '07:35:00', '2024-09-06 07:35:00', 'Entrada normal'),
(4, 2, 'entrada', '2024-09-06', '08:00:00', '2024-09-06 08:00:00', 'Entrada normal'),
(5, 3, 'entrada', '2024-09-06', '07:40:00', '2024-09-06 07:40:00', 'Entrada normal'),
(6, 3, 'entrada', '2024-09-06', '07:50:00', '2024-09-06 07:50:00', 'Entrada normal'),
(1, 1, 'saida', '2024-09-06', '11:30:00', '2024-09-06 11:30:00', 'Saida para almoco'),
(2, 1, 'saida', '2024-09-06', '11:35:00', '2024-09-06 11:35:00', 'Saida para almoco'),
(3, 2, 'saida', '2024-09-06', '11:40:00', '2024-09-06 11:40:00', 'Saida para almoco'),
(1, 1, 'entrada', '2024-09-06', '12:30:00', '2024-09-06 12:30:00', 'Retorno do almoco'),
(2, 1, 'entrada', '2024-09-06', '12:35:00', '2024-09-06 12:35:00', 'Retorno do almoco'),
(3, 2, 'entrada', '2024-09-06', '12:40:00', '2024-09-06 12:40:00', 'Retorno do almoco'),
(1, 1, 'saida', '2024-09-06', '17:00:00', '2024-09-06 17:00:00', 'Saida normal'),
(2, 1, 'saida', '2024-09-06', '17:05:00', '2024-09-06 17:05:00', 'Saida normal'),
(3, 2, 'saida', '2024-09-06', '17:00:00', '2024-09-06 17:00:00', 'Saida normal'),
(4, 2, 'saida', '2024-09-06', '17:15:00', '2024-09-06 17:15:00', 'Saida normal');

-- ============================================================================
-- ============================================================================
-- CONSULTAS UTEIS PARA USAR O BANCO DE DADOS
-- ============================================================================
-- ============================================================================

-- 1. REGISTRAR UMA NOVA ENTRADA OU SAIDA
-- Quando um QR Code eh lido, execute uma query similar a esta:
-- EXEMPLO: Aluno com matricula MAT001 entra as 07:30 do dia 06/09/2024
/*
INSERT INTO registros_movimentacao (aluno_id, turma_id, tipo_movimentacao, data_registro, hora_registro, data_hora_completa)
SELECT a.id, a.turma_id, 'entrada', CURDATE(), CURTIME(), NOW()
FROM alunos a
WHERE a.matricula = 'MAT001' AND a.status = 'ativo';
*/

-- 2. CONSULTAR TODAS AS MOVIMENTACOES DE UM ALUNO
-- EXEMPLO: Ver todos os registros de entrada e saida do aluno Joao Silva Santos
/*
SELECT
    a.nome,
    a.matricula,
    t.nome AS turma,
    rm.tipo_movimentacao,
    rm.data_hora_completa,
    rm.observacoes
FROM registros_movimentacao rm
JOIN alunos a ON rm.aluno_id = a.id
JOIN turmas t ON rm.turma_id = t.id
WHERE a.matricula = 'MAT001'
ORDER BY rm.data_hora_completa DESC;
*/

-- 3. CONSULTAR MOVIMENTACOES DE UM DIA ESPECIFICO
-- EXEMPLO: Ver todas as entradas e saidas no dia 06/09/2024
/*
SELECT
    a.nome,
    a.matricula,
    t.nome AS turma,
    rm.tipo_movimentacao,
    rm.hora_registro,
    rm.observacoes
FROM registros_movimentacao rm
JOIN alunos a ON rm.aluno_id = a.id
JOIN turmas t ON rm.turma_id = t.id
WHERE rm.data_registro = '2024-09-06'
ORDER BY rm.hora_registro ASC;
*/

-- 4. VERIFICAR QUEM ESTA PRESENTE NA ESCOLA (NO MOMENTO)
-- EXEMPLO: Ver quem esta dentro da escola (ultima movimentacao eh entrada)
/*
SELECT
    a.nome,
    a.matricula,
    t.nome AS turma,
    rm.hora_registro,
    rm.data_hora_completa
FROM registros_movimentacao rm
JOIN alunos a ON rm.aluno_id = a.id
JOIN turmas t ON rm.turma_id = t.id
WHERE rm.data_registro = CURDATE()
    AND rm.id = (
        SELECT MAX(rm2.id)
        FROM registros_movimentacao rm2
        WHERE rm2.aluno_id = rm.aluno_id
            AND rm2.data_registro = CURDATE()
    )
    AND rm.tipo_movimentacao = 'entrada'
ORDER BY a.nome ASC;
*/

-- 5. RELATORIO DE PRESENCA POR TURMA
-- EXEMPLO: Ver presenca da Turma 1º Ano A com faltas
/*
SELECT
    a.nome,
    a.matricula,
    a.faltas,
    COUNT(CASE WHEN rm.tipo_movimentacao = 'entrada' THEN 1 END) AS total_entradas,
    COUNT(CASE WHEN rm.tipo_movimentacao = 'saida' THEN 1 END) AS total_saidas,
    MAX(rm.data_hora_completa) AS ultima_movimentacao
FROM alunos a
LEFT JOIN registros_movimentacao rm ON a.id = rm.aluno_id
WHERE a.turma_id = 1 AND a.status = 'ativo'
GROUP BY a.id, a.nome, a.matricula, a.faltas
ORDER BY a.nome ASC;
*/

-- 6. CONSULTAR DADOS DE UM ALUNO PELA MATRICULA
-- EXEMPLO: Ver informacoes completas do aluno com matricula MAT001 e seu pai
/*
SELECT
    a.id,
    a.matricula,
    a.nome,
    a.aniversario,
    a.faltas,
    t.nome AS turma,
    u.nome AS pai_nome,
    u.email AS pai_email,
    a.status,
    qr.codigo_qr
FROM alunos a
JOIN turmas t ON a.turma_id = t.id
LEFT JOIN users u ON a.id_pai = u.id
LEFT JOIN qr_codes qr ON a.id = qr.aluno_id
WHERE a.matricula = 'MAT001';
*/

-- 7. ESTATISTICAS DIARIAS
-- EXEMPLO: Ver estatisticas de presenca do dia 06/09/2024
/*
SELECT
    COUNT(DISTINCT rm.aluno_id) AS total_alunos_com_movimento,
    COUNT(DISTINCT CASE WHEN rm.tipo_movimentacao = 'entrada' THEN rm.aluno_id END) AS total_entradas,
    COUNT(DISTINCT CASE WHEN rm.tipo_movimentacao = 'saida' THEN rm.aluno_id END) AS total_saidas
FROM registros_movimentacao rm
WHERE rm.data_registro = '2024-09-06';
*/

-- 8. ALUNOS QUE NAO REGISTRARAM ENTRADA HOJE
-- EXEMPLO: Ver quais alunos nao tiveram entrada registrada hoje
/*
SELECT
    a.id,
    a.matricula,
    a.nome,
    t.nome AS turma,
    a.faltas
FROM alunos a
JOIN turmas t ON a.turma_id = t.id
WHERE a.status = 'ativo'
    AND a.id NOT IN (
        SELECT DISTINCT aluno_id
        FROM registros_movimentacao
        WHERE data_registro = CURDATE() AND tipo_movimentacao = 'entrada'
    )
ORDER BY t.nome, a.nome ASC;
*/
