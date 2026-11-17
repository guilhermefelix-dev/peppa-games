<?php
$host = "localhost";
$port = "3307";
$db = "peppa_games";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8", $user, $pass);
    echo "CONEXAO OK!";
} catch (PDOException $e) {
    echo "Erro na conexao: " . $e->getMessage();
}
?>