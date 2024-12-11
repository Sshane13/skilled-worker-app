<?php
header("Access-Control-Allow-Origin: *"); // Use specific domain instead of '*' for security, e.g., "http://localhost:4200"
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection file
include('db.php');

// Check if the worker ID is provided in the query string
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $workerId = $_GET['id']; // Get the worker ID from the query string

    // Prepare SQL statement to delete worker profile
    $sql = "DELETE FROM workers WHERE id = :id";  // Use named parameters for PDO

    if ($stmt = $conn->prepare($sql)) {
        // Bind the ID parameter using PDO's bindParam
        $stmt->bindParam(':id', $workerId, PDO::PARAM_INT);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["message" => "Worker profile deleted successfully."]);
        } else {
            echo json_encode(["error" => "Error deleting profile."]);
        }

        // Close the statement
        $stmt->closeCursor();  // For PDO, close the cursor instead of close()
    } else {
        echo json_encode(["error" => "Error preparing statement."]);
    }
} else {
    echo json_encode(["error" => "Invalid worker ID."]);
}

// Close the database connection (PDO connection)
$conn = null;
?>
