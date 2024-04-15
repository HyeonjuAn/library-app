import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";

const DeleteAccountButton = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!user || !user.user_id) {
            return;
        }
        const config = {
            data: {
                user_id: user.user_id,
            },
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        try {
            await axios.delete("/api/user.php", config);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
    };

    return (
        <button className="btn btn-error" onClick={handleDelete}>
            Delete Account
        </button>
    );
};

export default DeleteAccountButton;
