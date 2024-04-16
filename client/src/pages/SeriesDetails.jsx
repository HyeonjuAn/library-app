import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

const SeriesDetails = () => {
    const { series_id } = useParams();
    const [series, setSeries] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooksOfSeries = async () => {
            try {
                const { data } = await axios.get(
                    `/api/series.php?series_id=${series_id}`,
                );
                console.log(data);
                setSeries(data.series);
                setBooks(data.books);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch series:", error);
                setError("Failed to fetch series details");
                setLoading(false);
            }
        };
        fetchBooksOfSeries();
    }, []);
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

    if (!books) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-gray-800">
                No books found
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-800 bg-white relative overflow-hidden min-h-screen w-full">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-14">
                <header className="text-gray-800 dark:text-white font-black text-3xl">
                    {series.Name}
                </header>
                <div className="pt-10 text-gray-800 dark:text-white font-black text-xl">
                    {series.description}
                </div>
                <div className="pt-3 text-gray-800 dark:text-white font-black text-xl">
                    {series.start_year} - {series.end_year ? series.end_year : "Present"}
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
            <div className="grid grid-cols-3 gap-4">
                {books.map((book) => (
                    <BookCard
                        key={book.ISBN}
                        book={book}
                        setBooks={setBooks}
                        books={books}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeriesDetails;
