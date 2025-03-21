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

// Get the collection ID from the query string
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    echo json_encode(['error' => 'Invalid collection ID']);
    exit;
}

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Get collection by ID
    $stmt = $pdo->prepare('SELECT * FROM collections WHERE id = ?');
    $stmt->execute([$id]);
    $collection = $stmt->fetch();
    
    if (!$collection) {
        echo json_encode(['error' => 'Collection not found']);
        exit;
    }
    
    echo json_encode($collection);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    exit;
}
?>