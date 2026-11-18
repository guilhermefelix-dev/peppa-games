CREATE DATABASE IF NOT EXISTS peppa_games;
USE peppa_games;

CREATE TABLE IF NOT EXISTS contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    assunto VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    ip_usuario VARCHAR(45) NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogo_slug VARCHAR(50) NOT NULL,
    parent_id INT NULL,
    autor VARCHAR(40) NOT NULL,
    texto TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_comentarios_jogo (jogo_slug),
    CONSTRAINT fk_comentarios_pai FOREIGN KEY (parent_id) REFERENCES comentarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS votos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comentario_id INT NOT NULL,
    token VARCHAR(64) NOT NULL,
    tipo ENUM('like', 'dislike') NOT NULL,
    UNIQUE KEY uq_voto (comentario_id, token),
    CONSTRAINT fk_votos_comentario FOREIGN KEY (comentario_id) REFERENCES comentarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogo_slug VARCHAR(50) NOT NULL,
    arquivo VARCHAR(60) NOT NULL,
    autor VARCHAR(40) NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fotos_jogo (jogo_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;