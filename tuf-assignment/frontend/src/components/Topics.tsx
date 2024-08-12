import { useState, useEffect } from 'react';
import axios from 'axios';
import { Addtopic } from './admin/Addtopics';

interface Topic {
    title: string;
}

export const Topics = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [togglePopup, setTogglePopup] = useState<boolean>(false);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get<{ topics: Topic[] }>('https://backend-final-2-2jx8.onrender.com/api/user/bulk');
                setTopics(response.data.topics);
                setLoading(false);
            } catch (e) {
                setError(true);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className="flex flex-col bg-slate-900 h-screen overflow-x-hidden p-4">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">Error fetching topics</div>}
            {!loading && !error && (
                <div className='flex flex-col gap-y-4'>
                    <button
                        onClick={() => setTogglePopup(true)}
                        className='border text-sm p-3 rounded-lg w-[250px] hover:bg-gray-800'
                    >
                        CLICK HERE TO ADD TOPICS
                    </button>
                    {togglePopup && (
                        <Addtopic onClose={() => setTogglePopup(false)} />
                    )}
                    <div className='flex flex-col gap-5 text-lg font-semibold text-slate-300'>
                        <div>EXISTING TOPICS</div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((topic, index) => (
                            <a
                                key={index}
                                href={`/admin/${topic.title}`} 
                                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                            >
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {topic.title}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    Click to edit the flashcards under this topic
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
