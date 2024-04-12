import bgImg from "../assets/background.png";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="dark:bg-gray-800 bg-white relative overflow-hidden min-h-screen w-full">
            <header className="h-24 sm:h-32 flex items-center z-30 w-full">
                <div className="container mx-auto px-6 flex items-center justify-between w-full">
                    <Link
                        to="/"
                        className="text-gray-800 dark:text-white font-black text-3xl"
                    >
                        LibrarySpace.
                    </Link>
                </div>
            </header>
            <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden w-full">
                <div className="container mx-auto px-6 flex flex-col md:flex-row relative py-16 w-full">
                    <div className="flex flex-col relative z-20 w-full lg:w-2/5">
                        <h1 className="font-bebas-neue uppercase text-3xl sm:text-4xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                            Explore. Discover. Learn.
                            <span className="w-20 h-2 bg-gray-800 dark:bg-white mt-4 mb-2"></span>
                            <span className="text-3xl sm:text-4xl">
                                Your journey begins here.
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-3 mb-3">
                            Dive into a universe of knowledge with LibrarySpace, your digital
                            gateway to thousands of books, articles, and multimedia resources.
                            Whether you're researching, reading for pleasure, or looking to
                            learn something new, we've got you covered.
                        </p>
                        <div className="flex mt-8">
                            <Link
                                to="/get-started"
                                className="btn btn-outline btn-primary mr-3"
                            >
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-primary">
                                Log In
                            </Link>
                        </div>
                    </div>
                    <div className="flex-grow flex justify-center items-center">
                        <img
                            src={bgImg}
                            className="object-cover max-h-[60vh] w-full"
                            alt="A wide array of books and resources available in our library"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
