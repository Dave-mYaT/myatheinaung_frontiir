<?php
// Database connection parameters
$dpServername = "localhost";
$dpUsername = "root";
$dpPassword = "";
$dpName = "test";

// Establishing the connection to the database
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
$sql = $conn->prepare("INSERT INTO `Customer`(`ID`, `Name`, `NRIC`, `Phone`, `Product`, `Price`) VALUES (?, ?, ?, ?, ?, ?)");
$sql->bind_param("sssssd", $ID, $Name, $NRIC, $Phone, $Product, $Price);


// Prepare the SQL query
$sqlQuery = "SELECT `ID`, `Name`, `NRIC`, `Phone`, `Product`, `Price` FROM `Customer` WHERE `Name` = ? AND `NRIC` = ? AND `Phone` = ?";

// Question mark => Replacing the values with the ID ( Prevents SQL Injection from the frontend )

$stmt = $conn->prepare($sqlQuery);
//Explanation: So `sss` means, three strings to replace the question mark, the question mark will be replaced by those variables,
//specifically the name, nric, and phone
$stmt->bind_param('sss', $Name, $NRIC, $Phone);

// To prepare the query and to execute the query
//Bind parameters is to replace the $sqlQuery to be the query inserted in the $stmt
// Basically string.replace()
$stmt->execute();
$results = $stmt->get_result();
// {
//     TABLE1: 123
//     TABLE2:ID
// }
// $results = $db->query($sql);

// Guard clauses => Code readibility, best practices
if ($results->num_rows === 0) {
    // echo json_encode("NOT On the database");
    // INSERT DATA
    if ($sql->execute()) {
        echo json_encode("Inserted Successfully");
    } 
    else {
        echo "Error: " . $sql->error;
    }
    //Just create data
    // You can proceed to create the data here
}
else {
    echo json_encode("On the database");
    //BECAUSE OF THE LINE BELOW THIS, IT CAUSES ERROR TO THE CLIENT
    //its NOT an ERROR
    // echo (http_response_code(403));
    //DONT create data
    //Dont create the data, report an error to the frontend
}

// if ($sql->execute()) {
//     echo json_encode("Inserted Successfully");
// } else {
//     echo "Error: " . $sql->error;
// }

// Execute the statement and check for success
// if ($sql->execute()) {
//     echo json_encode("Inserted Successfully");
// } else {
//     echo "Error: " . $sql->error;
// }

// $sql = "SELECT * FROM Customer;";
//             $result = mysqli_query($conn, $sql);
//             $resultCheck = mysqli_num_rows($result);
//             $obj = new stdClass();
//             if($resultCheck > 0){
//                 while ($row = mysqli_fetch_assoc($result)){
//                     $cu_id = $row['ID'];
//                     $inner_obj = new stdClass();
//                     $inner_obj ->Name = $row['Name'];
//                     $inner_obj ->NRIC = $row['NRIC'];
//                     $inner_obj ->Phone = $row['Phone'];
//                     $inner_obj ->Product = $row['Product'];
//                     $inner_obj ->Price = "$".$row['Price'];
//                     $obj->{$cu_id} = $inner_obj; 
//                 }
//             }
//             print_r($obj);
// echo "Connected successfully ";


// $obj = new stdClass();
// $inner_obj = new stdClass();
// $obj-> ID = $inner_obj;
// $inner_obj -> Name = "MG MG";
// $inner_obj -> Age = 15;


// print_r($obj);
?>

