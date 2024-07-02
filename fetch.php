<?php
$dpServername = "localhost";
$dpUsername = "root";
$dpPassword = "";
$dpName = "test";

// Get POST data
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody);

$ID = $data->id;

// Establishing the connection to the database
$conn = new mysqli($dpServername, $dpUsername, $dpPassword, $dpName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sqlQuery = "SELECT `ID`, `Name`, `NRIC`, `Phone`, `Product`, `Price` FROM `Customer` WHERE `ID` = ?";
$stmt = $conn->prepare($sqlQuery);
$stmt->bind_param('s', $ID);
$stmt->execute();
$results = $stmt->get_result();

if ($results->num_rows > 0) {
    $row = $results->fetch_assoc();
    // So basically, it takes the id from query ?id = bla bla, and it sends to backend, backend will fetch the data from db and send it back to frontend, and it would prefill
    
    // Output data as JSON
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    // Handle case where no data is found
    http_response_code(404); // Not Found
    echo json_encode(array('message' => 'No data found'));
}

$stmt->close();
$conn->close();
?>
