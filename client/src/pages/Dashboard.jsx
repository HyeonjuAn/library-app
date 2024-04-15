import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import SeriesCard from "../components/SeriesCard";
import axios from "axios";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [series, setSeries] = useState([]);
    const [displayType, setDisplayType] = useState("books");
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/book.php?isbn=all");
                console.log(data);
                setBooks(data.books);
            } catch (error) {
                console.error("Dashboard Error: ", error);
            }
        })();
    }, []);

    const handleDisplayTypeChange = (e) => {
        setDisplayType(e.target.value);
        setCurrentPage(0);
    };

    const renderContent = () => {
        return displayType === "books"
            ? books.map((book) => (
                <BookCard
                    key={book.ISBN}
                    book={book}
                    setBooks={setBooks}
                    books={books}
                />
            ))
            : series.map((serie) => (
                <SeriesCard key={serie.series_id} series={serie} />
            ));
    };

    return (
        <div className="dark:bg-gray-800 bg-white relative overflow-y-auto h-screen">
            <Navbar />
            <div className="grid grid-cols-3 gap-4">{renderContent()}</div>
        </div>
    );
};

export default Dashboard;
