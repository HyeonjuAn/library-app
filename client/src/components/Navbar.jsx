import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
    return (
        <div className="navbar bg-gray-800">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    LibrarySpace.
                </Link>
            </div>
            <div className="flex-none gap-2">
                <SearchBar />
            </div>
        </div>
    );
};

export default Navbar;
