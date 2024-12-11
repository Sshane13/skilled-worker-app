<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include('db.php');

// Check if all required worker fields are provided
if (isset($_GET['name']) && isset($_GET['email']) && !empty($_GET['name']) && !empty($_GET['email'])) {
    $name = $_GET['name'];
    $email = $_GET['email'];

    try {
        // Check if the worker already exists in the workerspost table based on full data
        $sql = "SELECT COUNT(*) FROM workerspost WHERE name = :name AND email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        $count = $stmt->fetchColumn();
        
        // If count is greater than 0, worker exists
        if ($count > 0) {
            echo json_encode(true); // Worker exists
        } else {
            echo json_encode(false); // Worker does not exist
        }

    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid worker data.']);
}

$conn = null;
?>
