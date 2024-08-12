// import { useParams } from "react-router-dom"
import { Flashcards } from "../components/admin/flashcards";

export const Topics = () => {
    return(
        <div className="flex flex-col w-screen overflow-hidden">
        <h1 className="text-3xl flex justify-center border-b pb-2 mt-2">ADMIN DASHBOARD</h1>
        <Flashcards />
        </div>
    )
}