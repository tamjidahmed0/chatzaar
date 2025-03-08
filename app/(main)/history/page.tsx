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






interface Chat {


    data: {
        content: string;
        conversationId: string,

    };

    createdAt: string
}


const History = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversationId, setconversatonId] = useState<string | null>(null)

    const [history, setHistory] = useState<Chat[]>([])

    useEffect(() => {

        const api = async () => {

            try {
                const result = await getHistory();
                setHistory(result)

            } catch (error) {
                console.log(error)
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

        try {
            const result = await deleteHistory(conversationId)
            setHistory(result.conversations)
        } catch (error) {
            console.log(error)
        }

    }






    return (
        <div className="w-full lg:p-7 h-dvh">



            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
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
                            <div className='text-black flex justify-center text-2xl font-extrabold'>
                                <h1>There is no history at this moment.</h1>
                            </div>
                        ) : (

                            <div>
                                {history.map((chat, index) => (
                                    <Link
                                        href={`/?id=${chat.data.conversationId}`}
                                        key={index}
                                        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
                                    >
                                        <div>
                                            <p className="font-semibold">{chat.data.content}</p>
                                            <span className="text-sm text-gray-400">
                                                Created: {chat.createdAt ? moment(chat.createdAt).format("MMM D YYYY hh:mm A") : "N/A"}
                                            </span>

                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="bg-red-600 p-2 rounded-lg cursor-pointer" onClick={(e) => handleOpen(e, chat.data.conversationId)}>
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