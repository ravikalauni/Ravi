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

// Get the search query from the request
$query = isset($_GET['q']) ? $_GET['q'] : '';

if (empty($query)) {
    // If no query provided, return all collections
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        $stmt = $pdo->query('SELECT * FROM collections ORDER BY id DESC');
        $collections = $stmt->fetchAll();
        echo json_encode($collections);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Search in title, subtitle, description, and content
    $search = "%$query%";
    $stmt = $pdo->prepare('SELECT * FROM collections WHERE 
                           title LIKE ? OR 
                           subtitle LIKE ? OR 
                           description LIKE ? OR 
                           content LIKE ?
                           ORDER BY id DESC');
    $stmt->execute([$search, $search, $search, $search]);
    $collections = $stmt->fetchAll();
    
    echo json_encode($collections);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    exit;
}
?>