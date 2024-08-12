import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

export const Flashes: React.FC = () => {
    const { topic } = useParams<{ topic: string }>();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get<{ flashcards: Flashcard[] }>(
                    `https://backend-final-2-2jx8.onrender.com/api/user/flashcard/${topic}`
                );
                setFlashcards(response.data.flashcards);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
        fetchFlashcards();
    }, [topic]);

    const handleNext = () => {
        if (flashcards.length === 0) return;
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        if (flashcards.length === 0) return;
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const flashcardStyles: React.CSSProperties = {
        position: 'relative',
        height: '16rem',
        width: '100%',
        backgroundColor: '#2d3748',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'transform 0.7s',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
    };

    const frontBackStyles: React.CSSProperties = {
        position: 'absolute',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
    };

    const backStyles: React.CSSProperties = {
        ...frontBackStyles,
        transform: 'rotateY(180deg)',
    };

    return (
        <div className="bg-slate-900 w-screen h-screen overflow-hidden flex justify-center items-center">
            {loading && (
                <div className="text-center text-lg font-semibold text-gray-300">
                    Loading...
                </div>
            )}
            {error && (
                <div className="text-center text-red-400 font-semibold">
                    Error fetching flashcards
                </div>
            )}
            {!loading && !error && flashcards.length > 0 && (
                <div className="w-full max-w-md">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4">
                        <button
                            onClick={handlePrev}
                            className="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded"
                        >
                            &lt;
                        </button>
                    </div>

                    <div onClick={handleFlip} style={flashcardStyles}>
                        <div style={frontBackStyles}>
                            <div className="text-center text-2xl font-bold mb-4">
                                {flashcards[currentIndex].question}
                            </div>
                        </div>
                        <div style={backStyles}>
                            <div className="text-xl text-center font-medium text-gray-300">
                                {flashcards[currentIndex].answer}
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4">
                        <button
                            onClick={handleNext}
                            className="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
