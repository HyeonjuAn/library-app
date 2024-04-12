<?php

require_once 'db.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Read JSON data from the request body
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data === null) {
    // Respond with an error if JSON parsing fails
    echo json_encode(array('status' => 'error', 'message' => 'Invalid request'));
    exit;
}

// Check if email address exists and dont allow registration if it does
$sql = 'SELECT * FROM User WHERE email = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $data['email']);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    // Respond with an error if email address already exists
    echo json_encode(array('status' => 'error', 'message' => 'Email address already exists'));
    exit;
}

// Insert user data
$sql = 'INSERT INTO User (email, is_admin, Fname, Minit, Lname, password) VALUES (?, ?, ?, ?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissss", $data['email'], $data['is_admin'], $data['firstName'], $data['mInit'], $data['lastName'], $data['password']);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    // Respond with an error if the user could not be added
    echo json_encode(array('status' => 'error', 'message' => 'User could not be added'));
    exit;
} else {
    // Respond with a success message
    echo json_encode(array('status' => 'success', 'message' => 'User added successfully'));
}
?>

