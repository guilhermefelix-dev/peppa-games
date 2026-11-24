<?php
require_once 'config/conexao.php';
require_once 'config/util.php';
require_once 'config/auth.php';

exigirPost();
iniciarSessao();
$_SESSION = [];
if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => $p['path'], 'httponly' => true]);
}
setcookie('peppa_lembrar', '', ['expires' => time() - 3600, 'path' => '/']);
session_destroy();
responder(['sucesso' => true, 'mensagem' => 'Você saiu da conta.']);
