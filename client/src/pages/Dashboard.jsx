// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import ReactPaginate from 'react-paginate';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = () => {
    // Fetch books based on the current page and search query
    // For example:
    // fetch(`api/books?page=${currentPage}&limit=${booksPerPage}&search=${searchQuery}`)
    //   .then(response => response.json())
    //   .then(data => setBooks(data));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to the first page when search query changes
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="mt-4">
        <ReactPaginate
          pageCount={Math.ceil(totalBooks / booksPerPage)}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Dashboard;