<?php
require_once 'config/conexao.php';
require_once 'config/util.php';
require_once 'config/auth.php';

try {
    $u = usuarioLogado($pdo);
} catch (PDOException $e) {
    $u = null;
}
responder(['sucesso' => true, 'logado' => $u !== null, 'usuario' => $u ? ['nome' => $u['nome'], 'email' => $u['email']] : null]);
