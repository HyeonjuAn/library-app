import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImagePreview from "../components/ImagePreview";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (signUp) {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("username", username);
            formData.append("password", password);
            if (file) {
                formData.append("file", file);
            }

            try {
                const { data } = await axios.post(
                    "http://localhost:8000/api/register",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                    },
                );
                if (data.success) {
                    navigate(0);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/login",
                { email, password },
                { withCredentials: true },
            );
            if (data.success) {
                navigate("/dashboard");
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="dark:bg-gray-800 bg-white relative overflow-y-auto h-screen">
            <div className="max-w-md w-full mx-auto px-4 py-4">
                <header className="mb-12 text-center">
                    <div className="text-gray-800 dark:text-white font-black text-3xl">
                        LibrarySpace.
                    </div>
                </header>

                {/* Form */}
                <div className="flex justify-center w-full">
                    <input
                        type="radio"
                        name="options"
                        aria-label="Login"
                        className="join-item btn rounded-none grow"
                        onClick={() => {
                            setEmail("");
                            setUsername("");
                            setPassword("");
                            setFile(null);
                            setSignUp(false);
                        }}
                        checked={signUp === false}
                    />
                    <input
                        type="radio"
                        name="options"
                        aria-label="Sign Up"
                        className="join-item btn rounded-none grow"
                        onClick={() => {
                            setEmail("");
                            setUsername("");
                            setPassword("");
                            setFile(null);
                            setSignUp(true);
                        }}
                        checked={signUp === true}
                    />
                </div>
                {signUp ? (
                    <form
                        className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type={isChecked ? "text" : "password"}
                                placeholder="******************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2 flex justify-end">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-3">Show Password</span>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    className="checkbox"
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                        </div>
                        <div className="mb-8">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                                htmlFor="file"
                            >
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                id="file"
                                ref={fileInputRef}
                                className="file-input file-input-bordered file-input-md w-full max-w-xs"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        const selectedFile = e.target.files[0];
                                        setFile(selectedFile);
                                        setImage(URL.createObjectURL(selectedFile));
                                    }
                                }}
                            />
                            {image && (
                                <ImagePreview
                                    image={image}
                                    clearImage={() => {
                                        setFile(null);
                                        setImage(null);
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary" type="submit">
                                Sign Up
                            </button>
                            <a
                                href="#!"
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                ) : (
                    <form
                        className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type={isChecked ? "text" : "password"}
                                placeholder="******************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-2 flex justify-end">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-3">Show Password</span>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    className="checkbox"
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary" type="submit">
                                Sign In
                            </button>
                            <a
                                href="#!"
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
