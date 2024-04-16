import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../helpers/UserContext";

const ReturnButton = ({ book, setBook }) => {
    const { user } = useContext(UserContext);

    const handleReturn = async () => {
        if (book.copies >= 0) {
            try {
                const { data } = await axios.put("/api/checkout.php", {
                    user_id: user.user_id,
                    isbn: book.ISBN,
                    action: "increment",
                });
                setBook((prev) => ({ ...prev, copies: prev.copies + 1 }));
                console.log("Return response:", data);
            } catch (error) {
                console.error("Failed to return book:", error);
            }
        }
    };

    return (
        <button onClick={handleReturn} className="btn btn-success btn-outline">
            Return
        </button>
    );
};

export default ReturnButton;
