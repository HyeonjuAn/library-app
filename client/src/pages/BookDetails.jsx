import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import BookEditButton from "../components/BookEditButton";
import ReviewCard from "../components/ReviewCard";
import ReviewPost from "../components/ReviewPost";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../helpers/UserContext";

const BookDetails = () => {
    const { isbn } = useParams();
    const { user } = useContext(UserContext);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`/api/book.php?isbn=${isbn}`);
                console.log(data);
                setBook(data.book);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch book:", error);
                setError("Failed to fetch book details");
                setLoading(false);
            }
        };
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(
                    `/api/review.php?isbn=${isbn}&reviewer_id=all`,
                );
                console.log("Fetch Reviews: ", data);
                setReviews(data.reviews);
                let sum = 0;
                for (let i = 0; i < data.reviews.length; i++) {
                    sum += data.reviews[i].rating;
                }
                setRating(Math.round(sum / data.reviews.length));
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch book:", error);
                setError("Failed to fetch book details");
                setLoading(false);
            }
        };
        fetchBook();
        fetchReviews();
    }, [isbn]);

    const handleSaveBookDetails = async (updatedBook) => {
        try {
            const { data } = await axios.put(`/api/book.php`, updatedBook);
            console.log("Save response:", data);
            setBook(updatedBook); // Update local state with new book details
        } catch (error) {
            console.error("Failed to update book:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-red-500">
                Error: {error}
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-gray-800">
                No book found
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-800 bg-white relative overflow-hidden min-h-screen w-full">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-14">
                <header className="text-gray-800 dark:text-white font-black text-3xl">
                    {book.title}
                </header>
                <div className="pt-10 text-gray-800 dark:text-white font-black text-xl">
                    {book.author}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-xl">
                    ISBN: {book.ISBN}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-xl">
                    Genre: {book.genre}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-xl">
                    Copies: {book.copies}
                </div>
                <div className="pt-3 pb-10 text-gray-800 dark:text-white font-black text-xl">
                    <p>Checked Out: {book.checked_out ? "Yes" : "No"}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <ReviewCard rating={rating} />
                    <ReviewPost bookISBN={book.isbn} />
                </div>
                <div className="py-3">
                    <BookEditButton book={book} onSave={handleSaveBookDetails} />
                </div>
                <div className="flex py-3 gap-5 justify-center items-center">
                    <Link to="/" className="btn btn-primary btn-md">
                        Home
                    </Link>
                    <Link to="/dashboard" className="btn btn-primary btn-outline btn-md">
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
