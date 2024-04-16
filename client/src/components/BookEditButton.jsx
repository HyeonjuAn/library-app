import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../helpers/UserContext";

const BookEditButton = ({ book, onSave }) => {
    const { user } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    // Initialize form data when the component mounts or the book prop changes
    useEffect(() => {
        if (book) {
            setFormData(book);
        }
    }, [book]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        console.log("Saving Data:", formData);
        await onSave(formData);
        setEditMode(false);
    };

    const handleCancel = () => {
        setFormData(book); // Reset to original data
        setEditMode(false);
    };

    if (!user || user.is_admin !== 1) {
        return null; // Hide if not admin
    }

    return editMode ? (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                name="isbn"
                value={formData.ISBN || ""}
                onChange={handleInputChange}
                className="input input-bordered"
            />
            <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                className="input input-bordered"
            />
            <input
                type="text"
                name="author"
                value={formData.author || ""}
                onChange={handleInputChange}
                className="input input-bordered"
            />
            <input
                type="text"
                name="genre"
                value={formData.genre || ""}
                onChange={handleInputChange}
                className="input input-bordered"
            />
            <input
                type="number"
                name="copies"
                value={formData.copies || ""}
                onChange={handleInputChange}
                className="input input-bordered"
            />
            <button onClick={handleSave} className="btn btn-success">
                Save
            </button>
            <button onClick={handleCancel} className="btn btn-error">
                Cancel
            </button>
        </div>
    ) : (
        <button onClick={() => setEditMode(true)} className="btn btn-success">
            Edit
        </button>
    );
};

export default BookEditButton;
