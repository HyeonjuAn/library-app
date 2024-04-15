import React, { useState, useContext } from "react";
import { UserContext } from "../helpers/UserContext"; // Update path as necessary
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState({
        ISBN: "",
        title: "",
        genre: "",
        copies: "",
        author: "",
        series_id: "",
        newSeries: false,
        seriesName: "",
        seriesDescription: "",
        seriesStartYear: "",
        seriesEndYear: "",
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bookDetails);
        //form submission bs all backend
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1>Add New Book</h1>
            <input name="ISBN" placeholder="ISBN" onChange={handleChange} />
            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="genre" placeholder="Genre" onChange={handleChange} />
            <input
                name="copies"
                type="number"
                placeholder="Copies"
                onChange={handleChange}
            />
            <input name="author" placeholder="Author" onChange={handleChange} />
            <div>
                <label>
                    <input
                        type="radio"
                        name="newSeries"
                        value="false"
                        checked={!bookDetails.newSeries}
                        onChange={() =>
                            setBookDetails({ ...bookDetails, newSeries: false })
                        }
                    />{" "}
                    Existing Series
                </label>
                <label>
                    <input
                        type="radio"
                        name="newSeries"
                        value="true"
                        checked={bookDetails.newSeries}
                        onChange={() => setBookDetails({ ...bookDetails, newSeries: true })}
                    />{" "}
                    New Series
                </label>
            </div>
            {bookDetails.newSeries ? (
                <>
                    <input
                        name="seriesName"
                        placeholder="Series Name"
                        onChange={handleChange}
                    />
                    <textarea
                        name="seriesDescription"
                        placeholder="Series Description"
                        onChange={handleChange}
                    />
                    <input
                        name="seriesStartYear"
                        placeholder="Start Year"
                        onChange={handleChange}
                    />
                    <input
                        name="seriesEndYear"
                        placeholder="End Year"
                        onChange={handleChange}
                    />
                </>
            ) : (
                <input
                    name="series_id"
                    placeholder="Series ID"
                    onChange={handleChange}
                />
            )}
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default AddBookForm;
