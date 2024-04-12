<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "test";

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Connect to the database
$conn = new mysqli($host, $user, $pass, $db);

// If there is an error connecting to the database
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Test SQL query
// $sql = "SELECT * FROM User";
// $result = $conn->query($sql);
//
// if (!$result) {
//     die("Query failed: " . $conn->error);
// }
//
// // Check if there are rows returned from the query
// if ($result->num_rows > 0) {
//     $rows = array();
//
//     // Output data of each row
//     while($row = $result->fetch_assoc()) {
//         $rows[] = $row;
//         // Check if keys exist before accessing them
//         $id = isset($row["user_id"]) ? $row["user_id"] : "N/A";
//         $fname = isset($row["Fname"]) ? $row["Fname"] : "N/A";
//         $minit = isset($row["Minit"]) ? $row["Minit"] : "N/A";
//         $lname = isset($row["Lname"]) ? $row["Lname"] : "N/A";
//         $email = isset($row["email"]) ? $row["email"] : "N/A";
//         $password = isset($row["password"]) ? $row["password"] : "N/A";
//
//         // Echo data of each row
//         echo "user_id: " . $id . " - Name: " . $fname . " " . $minit . " " . $lname . " - Email: " . $email . " - Password: " . $password . "<br>";
//
//     }
//     $json = json_encode($rows);
//     echo $json;
// } else {
//     echo "0 results";
// }


// Close the database connection
// $conn->close();
?>
