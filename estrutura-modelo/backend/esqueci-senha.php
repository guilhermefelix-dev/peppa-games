<?php
require_once 'config/conexao.php';
require_once 'config/util.php';
require_once 'config/auth.php';

exigirPost();

$email = strtolower(trim($_POST['email'] ?? ''));
if (!emailValido($email)) {
    erro('Informe um e-mail válido.');
}

// Resposta sempre igual, exista a conta ou não (evita descobrir quem tem cadastro).
$resposta = ['sucesso' => true, 'mensagem' => 'Se esse e-mail tiver cadastro, enviaremos as instruções para redefinir a senha.'];

try {
    $st = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
    $st->execute([$email]);
    $u = $st->fetch(PDO::FETCH_ASSOC);

    if ($u) {
        $token = bin2hex(random_bytes(32));
        $hash = hash('sha256', $token);

        // Invalida pedidos antigos e cria um novo válido por 1 hora.
        $pdo->prepare('UPDATE redefinicao_senha SET usado = 1 WHERE usuario_id = ? AND usado = 0')->execute([$u['id']]);
        $pdo->prepare('INSERT INTO redefinicao_senha (usuario_id, token_hash, expira_em) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))')
            ->execute([$u['id'], $hash]);

        if (MODO_DEV) {
            // Sem servidor de e-mail no XAMPP: devolvemos o link para a tela.
            $resposta['link_dev'] = 'redefinir-senha.html?token=' . $token;
            $resposta['mensagem'] = 'Modo de desenvolvimento: como o XAMPP não envia e-mails, use o link abaixo (vale por 1 hora).';
        }
        // Em produção: enviar $token por e-mail com mail()/PHPMailer aqui.
    }
    responder($resposta);
} catch (PDOException $e) {
    erro('Não foi possível processar agora. A tabela "redefinicao_senha" existe? Importe o banco.sql de novo.', 500);
}