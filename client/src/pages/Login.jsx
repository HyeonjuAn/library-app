import { useState, useContext } from "react";
import { UserContext } from "../helpers/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mInit, setMInit] = useState("");
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(signUp);

        if (signUp) {
            try {
                const is_admin = checkAdmin ? 1 : 0;
                console.log(is_admin);
                const { data } = await axios.post(
                    "/api/register.php",
                    {
                        email,
                        password,
                        firstName,
                        lastName,
                        mInit,
                        is_admin,
                    },
                    {
                        withCredentials: true,
                    },
                );
                console.log(data);
                if (data.status) {
                    navigate(0);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
            return;
        } else {
            try {
                const { data } = await axios.post(
                    "/api/login.php",
                    { email, password },
                    { withCredentials: true },
                );
                if (data.status === "success") {
                    navigate("/dashboard");
                    setUser(data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="dark:bg-gray-800 bg-white relative overflow-y-auto h-screen">
            <div className="max-w-md w-full mx-auto px-4 py-4">
                <header className="mb-12 text-center">
                    <Link
                        to="/"
                        className="text-gray-800 dark:text-white font-black text-3xl"
                    >
                        LibrarySpace.
                    </Link>
                </header>

                {/* Form */}
                <div className="flex justify-center w-full">
                    <input
                        type="radio"
                        name="options"
                        aria-label="Login"
                        value="login"
                        className="join-item btn rounded-none grow"
                        onChange={() => setSignUp(false)}
                        checked={signUp === false}
                    />
                    <input
                        type="radio"
                        name="options"
                        aria-label="Sign Up"
                        value="signup"
                        className="join-item btn rounded-none grow"
                        onChange={() => setSignUp(true)}
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
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2 flex justify-between"
                                htmlFor="First Name"
                            >
                                <span>First Name</span>
                                <span className="badge badge-error">Required</span>
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                id="First Name"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2 flex justify-between"
                                htmlFor="Middle Initial"
                            >
                                <span>Middle Initial</span>
                                <span className="badge badge-info">Optional</span>
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                id="Middle Initial"
                                type="text"
                                placeholder="Middle Initial"
                                value={mInit}
                                onChange={(e) => setMInit(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2 flex justify-between"
                                htmlFor="Last Name"
                            >
                                <span>Last Name</span>
                                <span className="badge badge-error">Required</span>
                            </label>
                            <input
                                className="shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                id="Last Name"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label cursor-pointer btn btn-ghost">
                                <span className="label-text text-lg">Admin?</span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={() => setCheckAdmin(!checkAdmin)}
                                    checked={checkAdmin}
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2 flex justify-between"
                                htmlFor="email"
                            >
                                <span>Email</span>
                                <span className="badge badge-error">Required</span>
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
                                className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2 flex justify-between"
                                htmlFor="password"
                            >
                                <span>Password</span>
                                <span className="badge badge-error">Required</span>
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

                        <div className="flex items-center justify-between">
                            <button className="btn btn-primary" type="submit">
                                Sign Up
                            </button>
                            <Link
                                href="#!"
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            >
                                Forgot Password?
                            </Link>
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
                                className={`shadow appearance-none input-bordered rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline `}
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
