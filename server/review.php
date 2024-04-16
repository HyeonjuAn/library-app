<?php
include 'db.php'; 

header("Content-Type: application/json");

function reviewExists($conn, $reviewer_id, $isbn) {
    $query = "SELECT * FROM Review WHERE reviewer_id = ? AND belongs_to_ISBN = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("is", $reviewer_id, $isbn);
    $stmt->execute();
    $result = $stmt->get_result();
    $exists = $result->num_rows > 0;
    $stmt->close();
    return $exists;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $reviewer_id = isset($_GET['reviewer_id']) ? $_GET['reviewer_id'] : null;
        $isbn = isset($_GET['isbn']) ? $_GET['isbn'] : null;

        if ($reviewer_id === 'all') {
            $sql = "SELECT * FROM Review";
            $result = $conn->query($sql);

            $reviews = [];
            while ($row = $result->fetch_assoc()) {
                $reviews[] = $row;
            }

            echo json_encode(["reviews" => $reviews]);
        } elseif (!empty($reviewer_id) && !empty($isbn)) {
            $query = "SELECT * FROM Review WHERE reviewer_id = ? AND belongs_to_ISBN = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("is", $reviewer_id, $isbn);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                echo json_encode(["error" => "Review not found"]);
            } else {
                $review = $result->fetch_assoc();
                echo json_encode(["review" => $review]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Reviewer ID and ISBN are required"]);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["error" => "Invalid JSON"]);
            http_response_code(400);
            exit;
        }
    
        $reviewer_id = isset($data['reviewer_id']) ? $data['reviewer_id'] : null;
        $isbn = isset($data['isbn']) ? $data['isbn'] : null;
        $rating = isset($data['rating']) ? $data['rating'] : null;
    
        if (!$reviewer_id || !$isbn || $rating === null) {
            echo json_encode(["error" => "Reviewer ID, ISBN, and rating are required"]);
            http_response_code(400);
            exit;
        }
    
        if (!reviewExists($conn, $reviewer_id, $isbn)) {
            $insertQuery = "INSERT INTO Review (reviewer_id, belongs_to_ISBN, rating) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($insertQuery);
            if (!$stmt) {
                echo json_encode(["error" => "Database error: " . $conn->error]);
                http_response_code(500);
                exit;
            }
            $stmt->bind_param("isi", $reviewer_id, $isbn, $rating);
            $success = $stmt->execute();
            $stmt->close();
            echo json_encode(["success" => $success]);
            http_response_code($success ? 201 : 500);
        } else {
            echo json_encode(["success" => false, "error" => "Review already exists"]);
            http_response_code(409); // Conflict
        }
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
        $reviewer_id = $_DELETE['reviewer_id'];
        $isbn = $_DELETE['isbn'];

        if (reviewExists($conn, $reviewer_id, $isbn)) {
            $deleteQuery = "DELETE FROM Review WHERE reviewer_id = ? AND belongs_to_ISBN = ?";
            $stmt = $conn->prepare($deleteQuery);
            $stmt->bind_param("is", $reviewer_id, $isbn);
            $success = $stmt->execute();
            $stmt->close();
            echo json_encode(["success" => $success]);
        } else {
            echo json_encode(["success" => false, "error" => "Review does not exist to delete"]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}

$conn->close();
?>
