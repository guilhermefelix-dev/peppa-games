<?php
header('Content-Type: application/json; charset=utf-8');

// Garante que o acesso foi feito via formulário (POST)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Método não permitido."
    ]);
    exit;
}

require_once 'config/conexao.php';


$nome = trim($_POST['nome'] ?? '');
$nome = preg_replace('/\s+/', ' ', $nome); 
$email = trim($_POST['email'] ?? '');
$assunto = trim($_POST['assunto'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconhecido';


$assuntosPermitidos = ['duvida', 'sugestao', 'feedback'];

if (mb_strlen($nome) < 3 || mb_strlen($nome) > 60) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "O nome precisa ter entre 3 e 60 letras."
    ]);
    exit;
}

if (preg_match('/[0-9]/', $nome)) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "O nome não pode ter números."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Informe um e-mail válido, como nome@exemplo.com."
    ]);
    exit;
}

if (!in_array($assunto, $assuntosPermitidos, true)) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Selecione um assunto válido."
    ]);
    exit;
}

if ($mensagem === '' || mb_strlen($mensagem) > 500) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "A mensagem deve ter entre 1 e 500 caracteres."
    ]);
    exit;
}

if ($assunto === 'feedback' && mb_strlen($mensagem) < 20) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Conte mais sobre a sua experiência (mínimo 20 caracteres)."
    ]);
    exit;
}


try {
    $sql = "INSERT INTO contatos (nome, email, assunto, mensagem, ip_usuario) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $email, $assunto, $mensagem, $ip]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Mensagem enviada e salva com sucesso! Obrigado pelo contato."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao salvar a mensagem no banco de dados."
    ]);
}
?>