<?php
const JOGOS_VALIDOS = [
    'mvc2',
    'spider-man',
    'spider-man-2',
    'minecraft',
    'fortnite',
    'gta-san-andreas',
    'gta-v',
    'valorant',
    'league-of-legends',
    'resident-evil-4',
    'counter-strike'
];

function responder($dados, $codigo = 200)
{
    http_response_code($codigo);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function erro($mensagem, $codigo = 400)
{
    responder(["sucesso" => false, "mensagem" => $mensagem], $codigo);
}

function jogoValido($slug)
{
    return in_array($slug, JOGOS_VALIDOS, true);
}

function tokenValido($token)
{
    return is_string($token) && preg_match('/^[a-zA-Z0-9-]{16,64}$/', $token) === 1;
}

function limparNome($nome)
{
    return preg_replace('/\s+/u', ' ', trim((string) $nome));
}
?>