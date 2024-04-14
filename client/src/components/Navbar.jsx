import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
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
