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
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $reviewer_id = $data['reviewer_id'];
        $isbn = $data['isbn'];
        $rating = $data['rating'];

        if (!reviewExists($conn, $reviewer_id, $isbn)) {
            $insertQuery = "INSERT INTO Review (reviewer_id, belongs_to_ISBN, rating) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($insertQuery);
            $stmt->bind_param("isi", $reviewer_id, $isbn, $rating);
            $success = $stmt->execute();
            $stmt->close();
            echo json_encode(["success" => $success]);
        } else {
            echo json_encode(["success" => false, "error" => "Review already exists"]);
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
