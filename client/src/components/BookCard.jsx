// BookCard.jsx
import React from "react";

const BookCard = ({ book }) => {
  const goBack = () => {
    window.history.back();
  };

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
      <button onClick={goBack} className="btn btn-outline btn-primary">
        Go Back
      </button>
    </div>
  );
};

export default BookCard;
