<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Get JSON data from the request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Admin password - in a real app, this would be securely stored and hashed
$ADMIN_PASSWORD = 'admin123';

if (!isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Password is required'
    ]);
    exit;
}

$password = $data['password'];

if ($password === $ADMIN_PASSWORD) {
    echo json_encode([
        'success' => true
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid password'
    ]);
}
?>