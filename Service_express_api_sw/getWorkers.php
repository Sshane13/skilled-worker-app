<?php
header("Access-Control-Allow-Origin: *"); // Use specific domain instead of '*' for security, e.g., "http://localhost:4200"
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
include 'db.php';

$query = "SELECT * FROM workers";
$stmt = $conn->prepare($query);
$stmt->execute();
$workers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($workers);
?>
