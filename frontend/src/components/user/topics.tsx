import { useState, useEffect } from "react";
import axios from 'axios';

export const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('https://backend-final-2-2jx8.onrender.com/api/user/bulk');
                setTopics(response.data.topics);
                setLoading(false);
            } catch (e) {
                setError(true);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className="h-screen w-screen p-6 overflow-x-hidden bg-gray-900">
            {loading && <div className="text-center text-lg font-semibold text-gray-300">Loading...</div>}
            {error && <div className="text-center text-red-400 font-semibold">Error fetching</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                    <div key={topic.title} className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-100 mb-3">{topic.title.toUpperCase()}</h2>
                            <p className="text-gray-300 mb-4">
                                
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
                            </p>
                            <div className="flex justify-end">
                                <a href={`/user/${topic.title}`} className="text-white">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                        Explore
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
