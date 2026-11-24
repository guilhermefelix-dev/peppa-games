<?php
require_once 'config/conexao.php';
require_once 'config/util.php';
require_once 'config/auth.php';

exigirPost();

$nome = limparNome($_POST['nome'] ?? '');
$email = strtolower(trim($_POST['email'] ?? ''));
$senha = (string) ($_POST['senha'] ?? '');

if (mb_strlen($nome) < 2 || mb_strlen($nome) > 40) {
    erro('O nome precisa ter entre 2 e 40 caracteres.');
}
if (!emailValido($email)) {
    erro('Informe um e-mail válido.');
}
if (strlen($senha) < SENHA_MIN) {
    erro('A senha precisa ter pelo menos ' . SENHA_MIN . ' caracteres.');
}

try {
    $st = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
    $st->execute([$email]);
    if ($st->fetch()) {
        erro('Já existe uma conta com esse e-mail.', 409);
    }

    $hash = password_hash($senha, PASSWORD_DEFAULT);
    $st = $pdo->prepare('INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)');
    $st->execute([$nome, $email, $hash]);

    $novoId = (int) $pdo->lastInsertId();
    abrirSessaoDoUsuario($novoId, false);
    registrarLogin($pdo, $novoId, 'cadastro');
    responder(['sucesso' => true, 'mensagem' => 'Conta criada com sucesso!', 'usuario' => ['nome' => $nome, 'email' => $email]], 201);
} catch (PDOException $e) {
    erro('Não foi possível criar a conta agora. A tabela "usuarios" existe? Importe o banco.sql de novo.', 500);
}
