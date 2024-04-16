<?php

require_once 'db.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET");
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
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the user_id is provided
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

    if (!empty($user_id)) {
        // Prepare a SELECT statement to fetch the user from the database
        $stmt = $conn->prepare('SELECT * FROM User WHERE user_id = ?');
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if the user exists
        if ($result->num_rows === 0) {
            // Respond with an error if the user does not exist
            echo json_encode(array('status' => 'error', 'message' => 'User not found'));
            exit;
        } else {
            // Fetch user data
            $user = $result->fetch_assoc();

            // Respond with success and user data
            echo json_encode(array('user' => $user, 'status' => 'success', 'message' => 'User fetched successfully'));
            exit;
        }
    } else {
        // Respond with an error if the user_id is not provided
        echo json_encode(array('status' => 'error', 'message' => 'User ID is required'));
        exit;
    }
} else {
    // Respond with an error if the request method is not supported
    echo json_encode(array('status' => 'error', 'message' => 'Invalid request method'));
    exit;
}

?>
