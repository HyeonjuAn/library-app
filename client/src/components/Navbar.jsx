import { useContext } from "react";
import { UserContext } from "../helpers/UserContext";
import { Link } from "react-router-dom";
import DeleteAccountButton from "./DeleteAccountButton";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="navbar bg-gray-800 fixed z-50">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    LibrarySpace.
                </Link>
            </div>
            <div className="flex-none gap-2">
                {user && (
                    <div className="flex gap-2">
                        <LogoutButton />
                        <DeleteAccountButton />
                        <Link to={`/profile/${user.user_id}`} className="btn btn-primary">
                            Profile
                        </Link>
                    </div>
                )}
                {user && user.is_admin ? (
                    <div className="flex gap-2">
                        <Link to="/add-book" className="btn btn-success">
                            Add Book
                        </Link>
                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
