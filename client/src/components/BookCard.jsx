// BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    let id = 0;
    return (
        <div class="card w-96 text-neutral-content bg-neutral">
            <div class="card-body">
                <h2 class="card-title">Book Title</h2>
                <p>Author</p>
                <p>Book Description</p>
                <div class="card-actions justify-end">
                    <Link to={`/book/:${id}`} className="btn btn-secondary">
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

// <div className="w-52 h-30 p-6 rounded-lg shadow-lg border-white bg-lblue flex justify-center flex-col items-center">
//     <figure>
//         <img src={book.coverImage} alt={book.title} className="w-[100px] h-auto" />
//     </figure>
//     <div className="pt-3">
//         <h2 className="text-xl text-gray-800 dark:text-white font-bold  ">
//             {book.title}
//         </h2>
//         <p className="text-gray-800 dark:text-white text-1xl ">by: {book.author}</p>
//     </div>
// </div>;
