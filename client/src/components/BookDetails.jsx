// BookDetails.jsx
import React, { useEffect, useState } from 'react';

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    // Fetch book data from an API or load it from a local file based on the bookId
    // Update the book state with the fetched data
    // For example:
    // fetch(`api/books/${bookId}`)
    //   .then(response => response.json())
    //   .then(data => setBook(data));
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col justify-center items-center py-14 ">
      <header className="text-gray-800 dark:text-white font-black text-3xl">
        {book.title}:
      </header>
      <img src={pic} alt="{book.author}" className="w-45 h-auto mt-10 " />
      <div className="pt-10 text-gray-800 dark:text-white font-black text-1xl">
        {book.author}:
      </div>
      <div className="pt-3 text-gray-800 dark:text-white font-black text-1xl">
        {book.ibsn}:
      </div>
      <div className="pt-3 text-gray-800 dark:text-white font-black text-1xl">
        {book.genre}:
      </div>
      <div className="pt-3 text-gray-800 dark:text-white font-black text-1xl">
        {book.copies}:
      </div>
      <div className="pt-3 pb-10 text-gray-800 dark:text-white font-black text-1xl">
        <p>Checked Out: {book.checked_out ? "Yes" : "No"}</p>
      </div>
      <button onClick={goBack} className="btn btn-outline btn-primary  ">
        Go Back
      </button>

      <div className="pt-10 pb-10 text-gray-800 dark:text-white font-black text-1xl">
        Reviews
      </div>
      <div className="w-4/5 p-6 rounded-lg shadow-lg border-white bg-lblue flex justify-center flex-col items-center">
        {book.reviews.map((review) => (
          <div key={review.id}>
            <h1 className="pt-2 pb-2 text-gray-800 dark:text-white font-black ">
              {review.text}
            </h1>
            <p>By: {review.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
