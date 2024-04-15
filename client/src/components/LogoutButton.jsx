import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";

const LogoutButton = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    return (
        <button className="btn btn-outline btn-error" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
