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

// Check if email and password are present in the decoded data
if (!isset($data['email']) || !isset($data['password'])) {
    // Respond with an error if email or password is missing
    echo json_encode(array('status' => 'error', 'message' => 'Email and password are required'));
    exit;
}

// Assign email and password variables
$email = $data['email'];
$password = $data['password'];

// Check if the user exists
$sql = 'SELECT * FROM User WHERE email = ? and password = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // Respond with an error if user does not exist
    echo json_encode(array('status' => 'error', 'message' => 'Invalid email or password'));
} else {
    // Fetch user data
    $user = $result->fetch_assoc();

    // Respond with success and user data
    echo json_encode(array('user' => $user, 'status' => 'success', 'message' => 'User logged in successfully'));
}
?>
