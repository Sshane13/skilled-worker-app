<?php
// Include the database connection
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get and decode JSON input
$data = json_decode(file_get_contents("php://input"), true);
$stmt = $conn->prepare("SELECT * FROM workerspost WHERE email = :email");
$stmt->bindValue(':email', $data['email']);
$stmt->execute();
$existingWorker = $stmt->fetch();

if ($existingWorker) {
    echo json_encode(["status" => "error", "message" => "Worker already posted"]);
    exit;
}
// Check required fields
$requiredFields = ['name', 'location', 'availability', 'phone', 'email'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        echo json_encode(["status" => "error", "message" => "Missing required field: $field"]);
        exit;
    }
}

// Prepare and execute query
try {
    $stmt = $conn->prepare("INSERT INTO workerspost (name, location, availability, phone, email, profileImage, workDone, workImage) 
                            VALUES (:name, :location, :availability, :phone, :email, :profileImage, :workDone, :workImage)");

    // Bind parameters
    $stmt->bindValue(':name', $data['name']);
    $stmt->bindValue(':location', $data['location']);
    $stmt->bindValue(':availability', $data['availability']);
    $stmt->bindValue(':phone', $data['phone']);
    $stmt->bindValue(':email', $data['email']);
    $stmt->bindValue(':profileImage', $data['profileImage'] ?? '');
    $stmt->bindValue(':workDone', $data['workDone'] ?? '');
    $stmt->bindValue(':workImage', $data['workImage'] ?? '');

    // Execute query
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Worker posted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
}
