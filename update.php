<?php
$dpServername = "localhost";
$dpUsername = "root";
$dpPassword = "";
$dpName = "test";

$conn = mysqli_connect($dpServername, $dpUsername, $dpPassword, $dpName);
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody);
if (json_last_error() != JSON_ERROR_NONE) {
    echo "JSON decode not success.\n";
}

$ID = $data->id;
$Name = $data->name;
$NRIC = $data->nric;
$Phone = $data->phone;
$Product = $data->selectedOption;
$Price = $data->price;

$sql = $conn->prepare("UPDATE `Customer` SET `Name`=?,`NRIC`=?,`Phone`=?,`Product`=?,`Price`=? WHERE `ID`=?");

// Check if prepare() failed
if ($sql === false) {
    die(json_encode("Prepare failed: " . htmlspecialchars($conn->error)));
}

$sql->bind_param("ssssds", $Name, $NRIC, $Phone, $Product, $Price, $ID);
if ($sql->execute()) {
    // Check if any rows were affected
    if ($sql->affected_rows > 0) {
        echo json_encode("Update Successful"); // Assuming $data contains the relevant data to be echoed
    } else {
        echo json_encode("Update successful, but no rows were affected.");
    }
} else {
    echo json_encode("Execute failed: " . htmlspecialchars($sql->error));
}
?>