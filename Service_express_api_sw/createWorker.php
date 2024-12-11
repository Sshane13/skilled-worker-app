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

if (isset($data['name']) && isset($data['location'])) {
    $name = $data['name'];
    $location = $data['location'];
    $availability = $data['availability'] ?? '';
    $phone = $data['phone'] ?? '';
    $email = $data['email'] ?? '';
    $profileImage = $data['profileImage'] ?? '';
    $mapsLink = $data['mapsLink'] ?? '';
    $workDone = $data['workDone'] ?? '';
    $workImage = $data['workImage'] ?? '';
    $skills = $data['skills'] ?? ''; // New field
    $experience = $data['experience'] ?? ''; // New field

    $query = "INSERT INTO workers (name, location, availability, phone, email, profileImage, mapsLink, workDone, workImage, skills, experience) 
              VALUES (:name, :location, :availability, :phone, :email, :profileImage, :mapsLink, :workDone, :workImage, :skills, :experience)";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':availability', $availability);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':profileImage', $profileImage);
    $stmt->bindParam(':mapsLink', $mapsLink);
    $stmt->bindParam(':workDone', $workDone);
    $stmt->bindParam(':workImage', $workImage);
    $stmt->bindParam(':skills', $skills); // Bind new parameter
    $stmt->bindParam(':experience', $experience); // Bind new parameter

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Worker profile added successfully']);
    } else {
        echo json_encode(['message' => 'Error adding worker profile']);
    }
} else {
    echo json_encode(['message' => 'Required fields missing']);
}

 
?>
