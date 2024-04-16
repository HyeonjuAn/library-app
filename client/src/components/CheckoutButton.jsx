import axios from "axios";

const CheckoutButton = ({ book, setBook }) => {
    const handleCheckout = async () => {
        if (book.copies > 0) {
            try {
                const { data } = await axios.put("/api/checkout.php", {
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
