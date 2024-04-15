import { useEffect, useContext, useState } from "react";
import { UserContext } from "../helpers/UserContext";
import axios from "axios";

const ReviewPost = ({ bookISBN }) => {
    const { user } = useContext(UserContext);
    const [review, setReview] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "/api/review.php",
                {
                    isbn: bookISBN,
                    rating: review,
                    reviewer_id: user.user_id,
                },
                { withCredentials: true },
            );
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(review);
    }, [review]);

    return (
        <form onSubmit={handleSubmit} className="flex align-items gap-2">
            <div className="rating">
                <input
                    type="radio"
                    name="rating"
                    value={1}
                    onChange={(e) => setReview(e.target.value)}
                    className="mask mask-star-2 bg-orange-400"
                    checked={review == 1}
                />
                <input
                    type="radio"
                    name="rating"
                    value={2}
                    onChange={(e) => setReview(e.target.value)}
                    className="mask mask-star-2 bg-orange-400"
                    checked={review == 2}
                />
                <input
                    type="radio"
                    name="rating"
                    value={3}
                    onChange={(e) => setReview(e.target.value)}
                    className="mask mask-star-2 bg-orange-400"
                    checked={review == 3}
                />
                <input
                    type="radio"
                    name="rating"
                    value={4}
                    onChange={(e) => setReview(e.target.value)}
                    className="mask mask-star-2 bg-orange-400"
                    checked={review == 4}
                />
                <input
                    type="radio"
                    name="rating"
                    value={5}
                    onChange={(e) => setReview(e.target.value)}
                    className="mask mask-star-2 bg-orange-400"
                    checked={review == 5}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
                Submit
            </button>
        </form>
    );
};

export default ReviewPost;
