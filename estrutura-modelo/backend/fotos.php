<?php
header('Content-Type: application/json; charset=utf-8');

require_once 'config/conexao.php';
require_once 'config/util.php';

const TAMANHO_MAXIMO = 3145728;

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    $jogo = $_GET['jogo'] ?? '';

    if (!jogoValido($jogo)) {
        erro("Jogo inválido.");
    }

    try {
        $stmt = $pdo->prepare("SELECT id, arquivo, autor FROM fotos WHERE jogo_slug = ? ORDER BY id DESC");
        $stmt->execute([$jogo]);
        $linhas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        erro("Erro ao carregar as fotos.", 500);
    }

    $fotos = [];
    foreach ($linhas as $linha) {
        $fotos[] = [
            "id" => (int) $linha['id'],
            "url" => "../backend/uploads/" . $linha['arquivo'],
            "autor" => $linha['autor']
        ];
    }

    responder(["sucesso" => true, "fotos" => $fotos]);
}

if ($metodo === 'POST') {
    $jogo = $_POST['jogo'] ?? '';
    $autor = limparNome($_POST['autor'] ?? '');

    if (!jogoValido($jogo)) {
        erro("Jogo inválido.");
    }

    if (mb_strlen($autor) < 2 || mb_strlen($autor) > 40) {
        erro("O nome precisa ter entre 2 e 40 caracteres.");
    }

    if (!isset($_FILES['foto'])) {
        erro("Escolha uma imagem para enviar.");
    }

    $arquivo = $_FILES['foto'];

    if ($arquivo['error'] === UPLOAD_ERR_INI_SIZE || $arquivo['error'] === UPLOAD_ERR_FORM_SIZE) {
        erro("A imagem é grande demais. O limite é 3 MB.");
    }

    if ($arquivo['error'] !== UPLOAD_ERR_OK) {
        erro("Não foi possível receber a imagem. Tente novamente.");
    }

    if ($arquivo['size'] > TAMANHO_MAXIMO) {
        erro("A imagem é grande demais. O limite é 3 MB.");
    }

    $info = @getimagesize($arquivo['tmp_name']);
    $extensoes = [
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_PNG => 'png',
        IMAGETYPE_GIF => 'gif',
        IMAGETYPE_WEBP => 'webp'
    ];

    if ($info === false || !isset($extensoes[$info[2]])) {
        erro("Envie uma imagem JPG, PNG, GIF ou WEBP.");
    }

    $pasta = __DIR__ . '/uploads';

    if (!is_dir($pasta) && !mkdir($pasta, 0755, true)) {
        erro("Não foi possível criar a pasta de imagens.", 500);
    }

    $nomeArquivo = bin2hex(random_bytes(12)) . '.' . $extensoes[$info[2]];

    if (!move_uploaded_file($arquivo['tmp_name'], $pasta . '/' . $nomeArquivo)) {
        erro("Não foi possível salvar a imagem.", 500);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO fotos (jogo_slug, arquivo, autor) VALUES (?, ?, ?)");
        $stmt->execute([$jogo, $nomeArquivo, $autor]);
    } catch (PDOException $e) {
        @unlink($pasta . '/' . $nomeArquivo);
        erro("Erro ao salvar a foto.", 500);
    }

    responder(["sucesso" => true, "mensagem" => "Foto enviada com sucesso!"], 201);
}

erro("Método não permitido.", 405);
?>