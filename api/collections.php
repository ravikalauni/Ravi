<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$host = 'localhost';
$db   = 'collections_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Get all collections from database
    $stmt = $pdo->query('SELECT * FROM collections ORDER BY id DESC');
    $collections = $stmt->fetchAll();
    
    echo json_encode($collections);
} catch (PDOException $e) {
    // For development
    echo json_encode(['error' => $e->getMessage()]);
    
    // For production
    // echo json_encode(['error' => 'Database connection failed']);
    exit;
}
?>