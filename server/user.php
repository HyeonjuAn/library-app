<?php

require_once 'db.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Read JSON data from the request body
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Check if the request is a PUT request (Update)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Check if the JSON data is valid
    if ($data === null) {
        // Respond with an error if JSON parsing fails
        echo json_encode(array('status' => 'error', 'message' => 'Invalid request'));
        exit;
    } else {
        $user_id = isset($data['user_id']) ? $data['user_id'] : null;

        if (!empty($user_id)) {
            // Prepare a DELETE statement to remove the user from the database
            $stmt = $conn->prepare('DELETE FROM User WHERE user_id = ?');
            $stmt->bind_param('s', $user_id);
            $stmt->execute();

            // Check if the user was deleted successfully
            if ($stmt->affected_rows > 0) {
                echo json_encode(array('status' => 'success', 'message' => 'User deleted successfully'));
                exit;
            } else {
                echo json_encode(array('status' => 'error', 'message' => 'User not found or already deleted'));
                exit;
            }
        } else {
            // Respond with an error if the user_id is not provided
            echo json_encode(array('status' => 'error', 'message' => 'User ID is required'));
            exit;
        }
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid request method'));
    exit;
}

?>
