import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();

    return (
        <>
            <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen w-full flex flex-col items-center justify-center">
                <div className="text-center">
                    <p className="text-3xl font-semibold text-white">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-white">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            className="btn btn-outline btn-primary"
                            type="button"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Go Back Home
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
