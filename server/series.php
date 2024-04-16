<?php
require_once 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type: application/json");

$response = ['status' => 'error', 'message' => 'Invalid request'];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $series_name = isset($_GET['series_name']) ? $_GET['series_name'] : null;
        $series_id = isset($_GET['series_id']) ? $_GET['series_id'] : null;

        if ($series_name === 'all') {
            // fetch all series
            $sql = 'SELECT * FROM Series';
            $result = $conn->query($sql);

            $series = [];
            while ($row = $result->fetch_assoc()) {
                $series[] = $row;
            }

            $response = ['series' => $series, 'status' => 'success', 'message' => 'Series fetched successfully'];
        } elseif (!empty($series_id)) {
            // fetch series by name
            $stmt = $conn->prepare('SELECT * FROM Book WHERE series_id = ?');
            $stmt->bind_param('i', $series_id);
            $stmt->execute();
            $result = $stmt->get_result();

            $books = [];

            if ($result->num_rows === 0) {
                $response = ['status' => 'error', 'message' => 'Series not found'];
            } else {
                while ($row = $result->fetch_assoc()) {
                    $books[] = $row;
                }
                $stmt = $conn->prepare('SELECT * FROM Series WHERE series_id = ?');
                $stmt->bind_param('i', $series_id);
                $stmt->execute();
                $result = $stmt->get_result();
                $series = $result->fetch_assoc();
                $response = ['series' => $series, 'books' => $books, 'status' => 'success', 'message' => 'Series fetched successfully'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Series name is required'];
        } 
        break;

    case 'DELETE':
        $json_data = file_get_contents('php://input'); 
        $data = json_decode($json_data, true);
        $series_name = $data['series_name'] ?? null;

        if(!empty($series_name)) {
            $stmt = $conn->prepare('DELETE FROM Series WHERE Name = ?');
            $stmt->bind_param('s', $series_name);
            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $response = ['status' => 'success', 'message' => 'Series deleted successfully'];
            } else {
                $response = ['status' => 'error', 'message' => 'Series not found or already deleted'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Series name is required'];
        }
        break;

    default:
        $response = ['status' => 'error', 'message' => 'Invalid request method'];
        break;
}
echo json_encode($response);
$conn->close();
?>
