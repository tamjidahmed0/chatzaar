const SkeletonChatHistory = () => {
    return (
        <div className="w-full lg:p-7 h-dvh">
            <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full overflow-y-auto">
                <div className="max-w-3xl mx-auto p-4 text-white">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center mb-4 text-black">
                        My Chat History
                    </h1>
                    <p className="text-center text-gray-400 mb-6">
                        Access your complete chat history across diverse topics and interactions with different models.
                    </p>

                    {/* Skeleton Loader for Chat History */}
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-300 animate-pulse p-4 rounded-lg shadow-md"
                            >
                                <div className="w-3/4">
                                    <div className="h-5 bg-gray-400 rounded w-2/3 mb-2"></div>
                                    <div className="h-3 bg-gray-400 rounded w-1/3"></div>
                                </div>
                                <div className="h-8 w-8 bg-gray-400 rounded"></div>
                            </div>
                        ))}
                    </div>

            
                </div>
            </div>
        </div>
    );
};

export default SkeletonChatHistory;
