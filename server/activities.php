<?php

require_once 'db.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$response = ['status' => 'error', 'message' => 'Invalid request'];
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

        if (!empty($user_id)) {
            $stmt = $conn->prepare('SELECT * FROM Activity WHERE user_id = ?');
            $stmt->bind_param('i', $user_id);
            $stmt->execute();
            $result = $stmt->get_result();

            $activities = [];
            while ($row = $result->fetch_assoc()) {
                $activities[] = $row;
            }

            $response = ['activities' => $activities, 'status' => 'success', 'message' => 'Activities fetched successfully'];
        } else {
            $response = ['status' => 'error', 'message' => 'User ID is required'];
        }
        break;
    default:
        $response = ['status' => 'error', 'message' => 'Invalid request method'];
        break;
}

echo json_encode($response);
?>
