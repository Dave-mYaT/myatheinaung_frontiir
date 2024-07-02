<?php
$dpServername = "localhost";
$dpUsername = "root";
$dpPassword = "";
$dpName = "test";

$conn = mysqli_connect($dpServername, $dpUsername, $dpPassword, $dpName);
if ($conn->connect_error) {
    die(json_encode("Connection failed: " . htmlspecialchars($conn->connect_error)));
}

$requestBody = file_get_contents('php://input');
$ID = json_decode($requestBody);

if (json_last_error() != JSON_ERROR_NONE) {
    die(json_encode("JSON decode not successful."));
}

$sql = $conn->prepare("DELETE FROM `Customer` WHERE `ID` = ?");

if ($sql === false) {
    die(json_encode("Prepare failed: " . htmlspecialchars($conn->error)));
}

$sql->bind_param("s", $ID);
if ($sql->execute()) {
    // Check if any rows were affected
    if ($sql->affected_rows > 0) {
        echo json_encode("Delete Successful");
    } else {
        echo json_encode("Delete successful, but no rows were affected.");
    }
} else {
    echo json_encode("Execute failed: " . htmlspecialchars($sql->error));
}

$sql->close();
$conn->close();
?>
