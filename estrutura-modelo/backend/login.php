<?php
require_once 'config/conexao.php';
require_once 'config/util.php';
require_once 'config/auth.php';

exigirPost();

$email = strtolower(trim($_POST['email'] ?? ''));
$senha = (string) ($_POST['senha'] ?? '');
$lembrar = ($_POST['lembrar'] ?? '') === '1';

if ($email === '' || $senha === '') {
    erro('Preencha e-mail e senha.');
}

try {
    $st = $pdo->prepare('SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ?');
    $st->execute([$email]);
    $u = $st->fetch(PDO::FETCH_ASSOC);

    // Mensagem igual para "e-mail não existe" e "senha errada": não revela quais e-mails têm conta.
    if (!$u || !password_verify($senha, $u['senha_hash'])) {
        erro('E-mail ou senha incorretos.', 401);
    }

    if (password_needs_rehash($u['senha_hash'], PASSWORD_DEFAULT)) {
        $pdo->prepare('UPDATE usuarios SET senha_hash = ? WHERE id = ?')
            ->execute([password_hash($senha, PASSWORD_DEFAULT), $u['id']]);
    }

    abrirSessaoDoUsuario($u['id'], $lembrar);
    responder(['sucesso' => true, 'mensagem' => 'Login realizado!', 'usuario' => ['nome' => $u['nome'], 'email' => $u['email']]]);
} catch (PDOException $e) {
    erro('Não foi possível entrar agora. A tabela "usuarios" existe? Importe o banco.sql de novo.', 500);
}
