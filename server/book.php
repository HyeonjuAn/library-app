<?php
require_once 'db.php';

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

// Initialize response array
$response = ['status' => 'error', 'message' => 'Invalid request'];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Use query parameters for GET request
        $isbn = isset($_GET['isbn']) ? $_GET['isbn'] : null;

        if ($isbn === 'all') {
            // Fetch all books
            $sql = 'SELECT * FROM Book';
            $result = $conn->query($sql);

            $books = [];
            while ($row = $result->fetch_assoc()) {
                $books[] = $row;
            }

            $response = ['books' => $books, 'status' => 'success', 'message' => 'Books fetched successfully'];
        } elseif (!empty($isbn)) {
            // Fetch book by ISBN
            $stmt = $conn->prepare('SELECT * FROM Book WHERE isbn = ?');
            $stmt->bind_param('s', $isbn);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                $response = ['status' => 'error', 'message' => 'Book not found'];
            } else {
                $book = $result->fetch_assoc();
                $response = ['book' => $book, 'status' => 'success', 'message' => 'Book fetched successfully'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'ISBN is required'];
        }
        break;

    case 'DELETE':
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);
        $isbn = $data['isbn'] ?? null;

        if (!empty($isbn)) {
            // Prepare a DELETE statement to remove the book from the database
            $stmt = $conn->prepare('DELETE FROM Book WHERE isbn = ?');
            $stmt->bind_param('s', $isbn);
            $stmt->execute();

            $id = isset($_GET['id']) ? $_GET['id'] : null;
            $activity_type = "Delete Book, ISBN: $isbn";
            $query = "INSERT INTO Activity (user_id, activity_type) VALUES (?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('is', $id, $activity_type);
            $stmt->execute();
 
            // Check if the book was deleted successfully
            if ($stmt->affected_rows > 0) {
                $response = ['status' => 'success', 'message' => 'Book deleted successfully'];
            } else {
                $response = ['status' => 'error', 'message' => 'Book not found or already deleted'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'ISBN is required'];
        }
        break;

    case 'POST':
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);
        echo $data;
        $isbn = $data['isbn'] ?? null;
        $title = $data['title'] ?? null;
        $author = $data['author'] ?? null;
        $genre = $data['genre'] ?? null;
        $copies = $data['copies'] ?? null;
        $series_id = $data['series_id'] ?? null;

        if (!empty($isbn) && !empty($title) && !empty($author) && !empty($copies) && !empty($series_id) && !empty($genre)) {
            // Prepare an INSERT statement to add a new book to the database
            $stmt = $conn->prepare('INSERT INTO Book (isbn, title, author, genre, copies, series_id) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->bind_param('ssssss', $isbn, $title, $author, $genre, $copies, $series_id);
            $stmt->execute();


            $id = isset($_GET['id']) ? $_GET['id'] : null;
            $activity_type = "Add Book, ISBN: $isbn";
            $query = "INSERT INTO Activity (user_id, activity_type) VALUES (?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('is', $id, $activity_type);
            $stmt->execute();

            // Check if the book was added successfully
            if ($stmt->affected_rows > 0) {
                $response = ['status' => 'success', 'message' => 'Book added successfully'];
            } else {
                $response = ['status' => 'error', 'message' => 'Failed to add book'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'ISBN, title, author, and copies are required'];
        }
        break;

    case 'PUT':
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);
        $isbn = $data['ISBN'] ?? null;
        $title = $data['title'] ?? null;
        $author = $data['author'] ?? null;
        $genre = $data['genre'] ?? null;
        $copies = $data['copies'] ?? null;
        $series_id = $data['series_id'] ?? null;

   
        if (!empty($isbn) && (!empty($title) || !empty($author) || !empty($genre) || !empty($copies) || !empty($series_id))) {
            // Prepare an UPDATE statement to update the book in the database
            $query = "UPDATE Book SET title = ?, author = ?, genre = ?, copies = ?, series_id = ? WHERE isbn = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('sssiss', $title, $author, $genre, $copies, $series_id, $isbn);
            $stmt->execute();
    
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            $activity_type = "Edit Book, ISBN: $isbn";
            $query = "INSERT INTO Activity (user_id, activity_type) VALUES (?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('is', $id, $activity_type);
            $stmt->execute();
 

            // Check if the book was updated successfully
            if ($stmt->affected_rows > 0) {
                $response = ['status' => 'success', 'message' => 'Book updated successfully'];
            } else {
                $response = ['status' => 'error', 'message' => 'Book not found or no new data to update'];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'All fields are required along with ISBN for update'];
        }
        break;

    default:
        $response = ['status' => 'error', 'message' => 'Unsupported request method'];
        break;
}

echo json_encode($response);
$conn->close();
?>
