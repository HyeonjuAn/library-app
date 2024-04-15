// BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import DeleteBookButton from "./DeleteBookButton";
import { useContext } from "react";
import { UserContext } from "../helpers/UserContext";

const BookCard = ({ book }) => {
    const { user } = useContext(UserContext);
    return (
        <div className="card w-96 text-neutral-content bg-neutral">
            <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p>{`By: ${book.author}`}</p>
                <p>{`Genre: ${book.genre}`}</p>
                {user && user.is_admin == 1 ? (
                    <div className="card-actions justify-between">
                        <DeleteBookButton ISBN={book.ISBN} />
                        <Link
                            to={`/books/${book.ISBN}`}
                            className="btn btn-primary btn-outline"
                        >
                            See Details
                        </Link>
                    </div>
                ) : (
                    <div className="card-actions justify-end">
                        <Link
                            to={`/books/${book.ISBN}`}
                            className="btn btn-primary btn-outline"
                        >
                            See Details
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCard;
