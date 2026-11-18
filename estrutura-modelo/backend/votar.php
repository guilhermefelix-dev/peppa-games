<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);
    exit;
}

require_once 'config/conexao.php';
require_once 'config/util.php';

$comentarioId = (int) ($_POST['comentario_id'] ?? 0);
$tipo = $_POST['tipo'] ?? '';
$token = $_POST['token'] ?? '';

if ($comentarioId <= 0) {
    erro("Comentário inválido.");
}

if (!in_array($tipo, ['like', 'dislike'], true)) {
    erro("Tipo de voto inválido.");
}

if (!tokenValido($token)) {
    erro("Identificação do navegador inválida. Recarregue a página.");
}

try {
    $existe = $pdo->prepare("SELECT id FROM comentarios WHERE id = ?");
    $existe->execute([$comentarioId]);

    if (!$existe->fetch(PDO::FETCH_ASSOC)) {
        erro("O comentário não existe mais.", 404);
    }

    $atual = $pdo->prepare("SELECT tipo FROM votos WHERE comentario_id = ? AND token = ?");
    $atual->execute([$comentarioId, $token]);
    $voto = $atual->fetch(PDO::FETCH_ASSOC);

    $meuVoto = $tipo;

    if (!$voto) {
        $pdo->prepare("INSERT INTO votos (comentario_id, token, tipo) VALUES (?, ?, ?)")
            ->execute([$comentarioId, $token, $tipo]);
    } elseif ($voto['tipo'] === $tipo) {
        $pdo->prepare("DELETE FROM votos WHERE comentario_id = ? AND token = ?")
            ->execute([$comentarioId, $token]);
        $meuVoto = null;
    } else {
        $pdo->prepare("UPDATE votos SET tipo = ? WHERE comentario_id = ? AND token = ?")
            ->execute([$tipo, $comentarioId, $token]);
    }

    $contagem = $pdo->prepare("SELECT
            SUM(tipo = 'like') AS likes,
            SUM(tipo = 'dislike') AS dislikes
        FROM votos WHERE comentario_id = ?");
    $contagem->execute([$comentarioId]);
    $totais = $contagem->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    erro("Erro ao registrar o voto.", 500);
}

responder([
    "sucesso" => true,
    "likes" => (int) $totais['likes'],
    "dislikes" => (int) $totais['dislikes'],
    "meu_voto" => $meuVoto
]);
?>