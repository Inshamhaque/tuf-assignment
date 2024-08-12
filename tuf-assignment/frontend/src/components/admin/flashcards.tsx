import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Addflashcard } from './AddFlashcard';
import { UpdateFlashcard } from './UpdateFlashCard';

interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

export const Flashcards: React.FC = () => {
    const { topic } = useParams<{ topic: string }>(); 
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [togglePopup, setTogglePopup] = useState(false);
    const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(null);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get<{ flashcards: Flashcard[] }>(`https://backend-final-2-2jx8.onrender.com/api/user/flashcard/${topic}`);
                setFlashcards(response.data.flashcards);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchFlashcards();
    }, [topic]);

    return (
        <div className="flex flex-col w-screen h-screen p-3 bg-gray-900">
            <div className='flex flex-col gap-5 text-2xl mb-5 font-semibold text-slate-300'>
                <div>FLASHCARDS FOR {topic?.toUpperCase()}</div>
            </div>
            {loading && <div className="text-center text-lg font-semibold text-gray-300">Loading...</div>}
            {error && <div className="text-center text-red-400 font-semibold">Error fetching flashcards</div>}
            {!loading && !error && (
                <div className='flex flex-col gap-y-5'>
                    <button
                        onClick={() => setTogglePopup(true)}
                        className='bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 border border-gray-600 text-sm mb-5 p-3 rounded-lg w-[250px] text-gray-100 hover:opacity-90 transition-opacity duration-300'
                    >
                        CLICK HERE TO ADD A FLASHCARD
                    </button>
                    {togglePopup && (
                        <Addflashcard onClose={() => setTogglePopup(false)} />
                    )}
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {flashcards.map((flashcard) => (
                            <div
                                key={flashcard.id}
                                className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                            >
                                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-100">
                                    Question: {flashcard.question}
                                </h5>
                                <p className="font-normal text-gray-400">
                                    Answer: {flashcard.answer}
                                </p>
                                <p onClick={() => setSelectedFlashcard(flashcard)} className="hover:underline w-fit hover:cursor-pointer text-sm text-slate-400 dark:text-blue-500 mt-2">
                                    Click to modify
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedFlashcard && (
                <UpdateFlashcard 
                    prev_answer={selectedFlashcard.answer} 
                    prev_question={selectedFlashcard.question} 
                    id={selectedFlashcard.id} 
                    onClose={() => setSelectedFlashcard(null)} 
                />
            )}
        </div>
    );
};
