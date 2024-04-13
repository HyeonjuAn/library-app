// BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="w-52 h-30 p-6 rounded-lg shadow-lg border-white bg-lblue flex justify-center flex-col items-center">
      <figure>
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-[100px] h-auto"
        />
      </figure>
      <div className="pt-3">
        <h2 className="text-xl text-gray-800 dark:text-white font-bold  ">
          {book.title}
        </h2>
        <p className="text-gray-800 dark:text-white text-1xl ">
          by: {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
