<?php


const SENHA_MIN = 6;
const DIAS_LEMBRAR = 30;

function iniciarSessao()
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $lembrar = isset($_COOKIE['peppa_lembrar']);
    $segundos = DIAS_LEMBRAR * 24 * 60 * 60;
    ini_set('session.gc_maxlifetime', (string) $segundos);
    session_set_cookie_params([
        'lifetime' => $lembrar ? $segundos : 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

function exigirPost()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        erro('Método não permitido.', 405);
    }
}

function emailValido($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false && strlen($email) <= 120;
}

function usuarioLogado($pdo)
{
    iniciarSessao();
    if (empty($_SESSION['usuario_id'])) {
        return null;
    }
    $st = $pdo->prepare('SELECT id, nome, email FROM usuarios WHERE id = ?');
    $st->execute([$_SESSION['usuario_id']]);
    $u = $st->fetch(PDO::FETCH_ASSOC);
    return $u ?: null;
}

function abrirSessaoDoUsuario($usuarioId, $lembrar)
{
    
    $segundos = DIAS_LEMBRAR * 24 * 60 * 60;
    if ($lembrar) {
        setcookie('peppa_lembrar', '1', ['expires' => time() + $segundos, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);
        $_COOKIE['peppa_lembrar'] = '1';
    } else {
        setcookie('peppa_lembrar', '', ['expires' => time() - 3600, 'path' => '/']);
        unset($_COOKIE['peppa_lembrar']);
    }
    iniciarSessao();
    session_regenerate_id(true);
    $_SESSION['usuario_id'] = (int) $usuarioId;
}
