const ImagePreview = ({ image, clearImage }) => (
    <div className="relative w-full">
        <div className="relative inline-block">
            <img
                className="mt-2 rounded-md max-w-full max-h-300 h-auto w-auto" // Tailwind CSS for styling
                src={image}
                alt="Preview"
            />
            <button
                className="absolute top-0 right-0 bg-white bg-opacity-80 text-black hover:bg-red-600 p-1" // Tailwind CSS for styling
                onClick={clearImage}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>
);

export default ImagePreview;
