export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-gray-100">
            <h1 className="text-4xl font-bold mb-12 text-gray-100">
                Welcome to the Dashboard
            </h1>
            <div className="flex gap-10">
                <a
                    href="/user"
                    className="bg-gradient-to-r text-black from-blue-500 to-purple-600 text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                >
                    User
                </a>
                <a
                    href="/admin"
                    className="bg-gradient-to-r text-black from-green-500 to-teal-600 text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                >
                    Admin
                </a>
            </div>
        </div>
    );
};
