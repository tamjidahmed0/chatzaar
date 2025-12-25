import React from 'react'

const ConversationSkeleton = () => {
    return (
        <>
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 py-3"
                >
                    <div className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-normal'}`}>
                        <div className="bg-white p-3 rounded-lg shadow-md lg:max-w-[40rem] max-w-full w-full">
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-[80%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ConversationSkeleton