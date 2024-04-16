<?php
require_once 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data === null) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid request'));
    exit;
}

if (!isset($data['isbn']) || !isset($data['action'])) {
    echo json_encode(array('status' => 'error', 'message' => 'ISBN and action are required'));
    exit;
}

$isbn = $data['isbn'];
$action = $data['action']; // Expect 'increment' or 'decrement'

if ($action === 'increment') {
    $id = $data['user_id'];
    $activity_type = "Return Book, ISBN: $isbn";
    $query = "INSERT INTO Activity (user_id, activity_type) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('is', $id, $activity_type);
    $stmt->execute();
 
    $sql = "UPDATE Book SET copies = copies + 1 WHERE isbn = ?";
} elseif ($action === 'decrement') {
    $total_copies = $conn->query("SELECT copies FROM Book WHERE isbn = '$isbn'")->fetch_assoc()['copies'];
    if ($total_copies === 0) {
        echo json_encode(array('status' => 'error', 'message' => 'No copies available'));
        exit;
    }
    $id = $data['user_id'];
    $activity_type = "Checkout Book, ISBN: $isbn";
    $query = "INSERT INTO Activity (user_id, activity_type) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('is', $id, $activity_type);
    $stmt->execute();
    $sql = "UPDATE Book SET copies = GREATEST(0, copies - 1) WHERE isbn = ?"; // Ensures copies do not go negative
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid action specified'));
    exit;
}

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('s', $isbn);
$result = $stmt->execute();

if ($result) {
    echo json_encode(['status' => 'success', 'message' => 'Copies updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update copies']);
}

$conn->close();
?>
