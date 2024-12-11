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

$data = json_decode(file_get_contents("php://input"), true); // Get data from Angular

if(isset($data['id']) && isset($data['name'])) {
    $id = $data['id'];
    $name = $data['name'];
    $location = $data['location'] ?? '';
    $availability = $data['availability'] ?? '';
    $phone = $data['phone'] ?? '';
    $email = $data['email'] ?? '';
    $profileImage = $data['profileImage'] ?? '';
    $mapsLink = $data['mapsLink'] ?? '';

    // Prepare SQL query to update profile
    $query = "UPDATE workers SET 
              name = :name, 
              location = :location, 
              availability = :availability, 
              phone = :phone, 
              email = :email, 
              profileImage = :profileImage, 
              mapsLink = :mapsLink 
              WHERE id = :id";

    $stmt = $conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':availability', $availability);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':profileImage', $profileImage);
    $stmt->bindParam(':mapsLink', $mapsLink);

    // Execute query
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Worker profile updated successfully']);
    } else {
        echo json_encode(['message' => 'Error updating worker profile']);
    }
} else {
    echo json_encode(['message' => 'Required fields missing']);
}
?>
