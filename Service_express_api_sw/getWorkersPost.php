<?php
// Include the database connection
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    // Prepare and execute the query
    $sql = "SELECT * FROM workerspost";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Fetch all rows as an associative array
    $workers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the data as JSON
    echo json_encode($workers);
} catch (Exception $e) {
    // Handle any errors
    echo json_encode(['error' => $e->getMessage()]);
}
?>
