import { useState } from "react";
import axios from 'axios';

export const Addtopic = ({ onClose }: { onClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onClickHandler = async () => {
        setLoading(true);
        try {
            await axios.post('https://backend-final-2-2jx8.onrender.com/api/admin/topics', {
                title
            });
            onClose();
            window.location.reload(); 
        } catch (e) {
            console.error("Error occurred", e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="backdrop-blur fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    onClick={onClose}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Add a new topic
                    </h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); 
                            onClickHandler();
                        }}
                    >
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Topic Title"
                            className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
                        />
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Topic"}
                        </button>
                    </form>
                    {error && <div className="text-red-500 mt-2">Error adding topic</div>}
                    <button
                        type="button"
                        className="py-2.5 px-5 mt-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
