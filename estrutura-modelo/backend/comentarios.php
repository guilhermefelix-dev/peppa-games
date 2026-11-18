<?php
header('Content-Type: application/json; charset=utf-8');

require_once 'config/conexao.php';
require_once 'config/util.php';

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    $jogo = $_GET['jogo'] ?? '';
    $token = $_GET['token'] ?? '';

    if (!jogoValido($jogo)) {
        erro("Jogo inválido.");
    }

    if (!tokenValido($token)) {
        $token = '';
    }

    try {
        $sql = "SELECT c.id, c.parent_id, c.autor, c.texto, c.data_envio,
                    (SELECT COUNT(*) FROM votos WHERE comentario_id = c.id AND tipo = 'like') AS likes,
                    (SELECT COUNT(*) FROM votos WHERE comentario_id = c.id AND tipo = 'dislike') AS dislikes,
                    (SELECT tipo FROM votos WHERE comentario_id = c.id AND token = ?) AS meu_voto
                FROM comentarios c
                WHERE c.jogo_slug = ?
                ORDER BY c.id ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$token, $jogo]);
        $linhas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        erro("Erro ao carregar os comentários.", 500);
    }

    $comentarios = [];
    foreach ($linhas as $linha) {
        $comentarios[] = [
            "id" => (int) $linha['id'],
            "parent_id" => $linha['parent_id'] === null ? null : (int) $linha['parent_id'],
            "autor" => $linha['autor'],
            "texto" => $linha['texto'],
            "data_envio" => $linha['data_envio'],
            "likes" => (int) $linha['likes'],
            "dislikes" => (int) $linha['dislikes'],
            "meu_voto" => $linha['meu_voto']
        ];
    }

    responder(["sucesso" => true, "comentarios" => $comentarios]);
}

if ($metodo === 'POST') {
    $jogo = $_POST['jogo'] ?? '';
    $autor = limparNome($_POST['autor'] ?? '');
    $texto = trim(str_replace("\r\n", "\n", (string) ($_POST['texto'] ?? '')));
    $parentBruto = $_POST['parent_id'] ?? '';
    $parentId = $parentBruto === '' ? null : (int) $parentBruto;

    if (!jogoValido($jogo)) {
        erro("Jogo inválido.");
    }

    if (mb_strlen($autor) < 2 || mb_strlen($autor) > 40) {
        erro("O nome precisa ter entre 2 e 40 caracteres.");
    }

    if ($texto === '' || mb_strlen($texto) > 1000) {
        erro("O comentário deve ter entre 1 e 1000 caracteres.");
    }

    try {
        if ($parentId !== null) {
            $busca = $pdo->prepare("SELECT id FROM comentarios WHERE id = ? AND jogo_slug = ?");
            $busca->execute([$parentId, $jogo]);

            if (!$busca->fetch(PDO::FETCH_ASSOC)) {
                erro("O comentário que você quer responder não existe mais.", 404);
            }
        }

        $stmt = $pdo->prepare("INSERT INTO comentarios (jogo_slug, parent_id, autor, texto) VALUES (?, ?, ?, ?)");
        $stmt->execute([$jogo, $parentId, $autor, $texto]);
    } catch (PDOException $e) {
        erro("Erro ao salvar o comentário.", 500);
    }

    responder([
        "sucesso" => true,
        "mensagem" => $parentId === null ? "Comentário publicado!" : "Resposta publicada!",
        "id" => (int) $pdo->lastInsertId()
    ], 201);
}

erro("Método não permitido.", 405);
?>