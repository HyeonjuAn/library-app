import React, { useState, useContext } from "react";
import { UserContext } from "../helpers/UserContext"; // Update path as necessary
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBookForm = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState({
        isbn: "",
        title: "",
        genre: "",
        copies: "",
        author: "",
        series_id: "",
    });

    // Redirect if not authorized
    if (!user || !user.is_admin) {
        return (
            <div>
                <p>You do not have permission to view this page.</p>
                <button onClick={() => navigate("/")} className="btn btn-outline">
                    Go back to Dashboard
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookDetails((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/book.php", bookDetails);
            console.log(res);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1>Add New Book</h1>
            <input
                name="isbn" // Corrected to match state key
                placeholder="ISBN"
                type="text"
                required
                onChange={handleChange}
            />
            <input
                name="title"
                type="text"
                required
                placeholder="Title"
                onChange={handleChange}
            />
            <input
                name="genre"
                type="text"
                required
                placeholder="Genre"
                onChange={handleChange}
            />
            <input
                name="copies"
                type="number"
                required
                placeholder="Copies"
                onChange={handleChange}
            />
            <input
                name="author"
                placeholder="Author"
                type="text" // Corrected from "string" to "text"
                required
                onChange={handleChange}
            />
            <input
                name="series_id"
                type="number"
                required
                placeholder="Series ID"
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default AddBookForm;
