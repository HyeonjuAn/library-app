import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../helpers/UserContext";

const CheckoutButton = ({ book, setBook }) => {
    const { user } = useContext(UserContext);

    const handleCheckout = async () => {
        if (book.copies > 0) {
            try {
                const { data } = await axios.put("/api/checkout.php", {
                    user_id: user.user_id,
                    isbn: book.ISBN,
                    action: "decrement",
                });
                setBook((prev) => ({ ...prev, copies: prev.copies - 1 }));
                console.log("Checkout response:", data);
            } catch (error) {
                console.error("Failed to checkout book:", error);
            }
        }
    };

    return (
        <button onClick={handleCheckout} className="btn btn-success btn-outline">
            Checkout
        </button>
    );
};

export default CheckoutButton;
