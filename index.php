<?php
// include_once('demo.php');
$dpServername = "localhost";
$dpUsername = "root"; 
$dpPassword = "";
$dpName = "test";

// Establishing the connection to the database
$conn = mysqli_connect($dpServername, $dpUsername, $dpPassword, $dpName);

// Guard clauses
if ($conn->connect_error) {
    // If connection fails, send error response to console
    $error_response = array(
        'status' => 'error',
        'message' => 'Database Connection failed: ' . $conn->connect_error
    );
    echo json_encode($error_response);
    die(); // Stop script execution
}

// $requestBody = file_get_contents('php://input');
// $data = json_decode($requestBody);
            $fetchDataQuery = "SELECT * FROM Customer;";
            $fetchData = $conn->prepare($fetchDataQuery);
            $fetchData->execute();
            $results = $fetchData->get_result();
        // Fetch all data as an associative array
            $data = $results->fetch_all(MYSQLI_ASSOC);

        // Close the statement
        $fetchData->close();
        
        header('Content-Type: application/json');
        echo (json_encode($data))

        // $resultCheck = mysqli_num_rows($result);
            // $obj = new stdClass();
            // if($resultCheck > 0){
            //     while ($row = mysqli_fetch_assoc($result)){
            //         $cu_id = $row['ID'];
            //         $inner_obj = new stdClass();
            //         $inner_obj ->Name = $row['Name'];
            //         $inner_obj ->NRIC = $row['NRIC'];
            //         $inner_obj ->Phone = $row['Phone'];
            //         $inner_obj ->Product = $row['Product'];
            //         $inner_obj ->Price = "$".$row['Price'];
            //         $obj->{$cu_id} = $inner_obj; 
            //     }
            // }
            // print_r($obj);
        ?>