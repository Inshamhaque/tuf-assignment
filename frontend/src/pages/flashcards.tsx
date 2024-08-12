import { useParams } from "react-router-dom"
import { Flashes } from "../components/user/flashcards";

export const Flashcards = () => {
    const { topic } = useParams();
    return(
        <div className="w-screen h-screen overflow-hidden">
            <div className="flex text-xl m-2 justify-center  font-semibold">LEARN {topic} by FlashCards!</div>
            <Flashes topic={topic || ""}/>
        </div>
    )
}