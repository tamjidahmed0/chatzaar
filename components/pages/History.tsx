'use client'
import React, { useEffect, useState } from 'react'
import getHistory from '@/lib/getHistory';
import Link from 'next/link';
import moment from "moment";
import { Trash2 } from 'lucide-react';
import deleteHistory from '@/lib/deleteChat';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import SkeletonChatHistory from '@/skeleton/ChatHistory';






interface Chat {
    _id: string,

    data: {
        content: string;
        messages: { content: string }[]


    };

    updatedAt: string
}


const History = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversationId, setconversatonId] = useState<string | null>(null)
    const [history, setHistory] = useState<Chat[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)



    useEffect(() => {

        const api = async () => {
            setLoading(true)

            try {
                const result = await getHistory();
                setHistory(result)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        api()



    }, [])



    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, conversationId: string) => {
        e.preventDefault()
        setIsOpen(true)
        setconversatonId(conversationId)
    };



    const handleDelete = async () => {
        setDeleteLoading(true)

        try {
            const result = await deleteHistory(conversationId)
            if (result) {
                setDeleteLoading(false)
            }
            setHistory(result)
        } catch (error) {
            console.log(error)
            setDeleteLoading(false)
        }

    }



    if (loading) {
        return <SkeletonChatHistory />
    }





    return (
        <div className="w-full lg:p-7 h-full">
            {deleteLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs ">
                    <div className='bg-white rounded-lg w-72 text-black h-40  flex items-center justify-center mb-4'>


                        <div className="flex flex-col items-center justify-center ">
                            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mb-4" />
                            <p className="text-lg font-medium tracking-wide">Deleting please wait...</p>
                        </div>

                    </div>


                </div>
            )}





            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this chat ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='text-black cursor-pointer'>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className='cursor-pointer'>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>




            <div className='bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full overflow-y-auto'>

                <div className="max-w-3xl mx-auto p-4 text-white">
                    <h1 className="text-2xl font-bold text-center mb-4 text-black">My Chat History</h1>
                    <p className="text-center text-gray-400 mb-6">
                        Access your complete chat history across diverse topics and interactions with different models.
                    </p>
                    <div className="space-y-4">
                        {history.length === 0 ? (
                            <div className='text-black flex justify-center text-2xl font-extrabold text-center'>
                                <h1>There is no history at this moment.</h1>
                            </div>
                        ) : (

                            <div className='space-y-4 '>
                                {history.map((chat, index) => (
                                    <Link
                                        href={`/?id=${chat._id}`}
                                        key={index}
                                        className="flex  items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
                                    >
                                        <div>
                                            <p className="font-semibold">{chat.data.messages[0]?.content}</p>
                                            <span className="text-sm text-gray-400">
                                                Last updated: {chat.updatedAt ? moment(chat.updatedAt).format("MMM D YYYY hh:mm A") : "N/A"}
                                            </span>

                                        </div>

                                        <div className="flex space-x-2">
                                            <button className="bg-red-600 p-2 rounded-lg cursor-pointer" onClick={(e) => handleOpen(e, chat._id)}>
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default History