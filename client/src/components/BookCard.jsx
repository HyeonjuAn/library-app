// BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <figure>
        <img src={book.coverImage} alt={book.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p>{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;