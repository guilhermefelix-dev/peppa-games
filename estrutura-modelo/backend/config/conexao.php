<?php
$host = "localhost";
$port = "3307";
$db = "peppa_games";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro na conexão com o banco de dados."
    ]);
    exit;
}
?>