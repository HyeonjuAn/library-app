import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
    const { isbn } = useParams();
    console.log(isbn);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
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
        fetchBook();
    }, [isbn]);

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
                    {book.title}:
                </header>
                <div className="pt-10 text-gray-800 dark:text-white font-black text-1xl">
                    {book.author}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-1xl">
                    ISBN: {book.ISBN}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-1xl">
                    Genre: {book.genre}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-1xl">
                    Copies: {book.copies}
                </div>
                <div className="pt-3 pb-10 text-gray-800 dark:text-white font-black text-1xl">
                    <p>Checked Out: {book.checked_out ? "Yes" : "No"}</p>
                </div>
                <div className="flex gap-5 justify-center items-center">
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
