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
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link>Profile</Link>
                        </li>
                        <li>
                            <Link>Settings</Link>
                        </li>
                        <li>
                            <Link>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
