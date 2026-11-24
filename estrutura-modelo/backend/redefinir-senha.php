<?php
require_once 'config/conexao.php';
require_once 'config/util.php';
require_once 'config/auth.php';

exigirPost();

$token = (string) ($_POST['token'] ?? '');
$senha = (string) ($_POST['senha'] ?? '');

if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
    erro('Link inválido ou expirado. Peça um novo.', 400);
}
if (strlen($senha) < SENHA_MIN) {
    erro('A senha precisa ter pelo menos ' . SENHA_MIN . ' caracteres.');
}

try {
    $st = $pdo->prepare('SELECT id, usuario_id FROM redefinicao_senha WHERE token_hash = ? AND usado = 0 AND expira_em > NOW()');
    $st->execute([hash('sha256', $token)]);
    $r = $st->fetch(PDO::FETCH_ASSOC);

    if (!$r) {
        erro('Link inválido ou expirado. Peça um novo.', 400);
    }

    $pdo->beginTransaction();
    $pdo->prepare('UPDATE usuarios SET senha_hash = ? WHERE id = ?')
        ->execute([password_hash($senha, PASSWORD_DEFAULT), $r['usuario_id']]);
    $pdo->prepare('UPDATE redefinicao_senha SET usado = 1 WHERE usuario_id = ?')->execute([$r['usuario_id']]);
    $pdo->commit();

    responder(['sucesso' => true, 'mensagem' => 'Senha alterada! Já pode entrar com a nova senha.']);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    erro('Não foi possível redefinir agora.', 500);
}
