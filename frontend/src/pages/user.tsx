import { Topics } from "../components/user/topics"

export const Userside = ()=>{
    return(
        <div className="overflow-x-hidden h-screen w-screen">
            <h1 className="flex justify-center text-2xl font-semibold border-b p-2" >EXPLORE LEARNING PATHS</h1>
            <Topics />
        </div>
    )
}