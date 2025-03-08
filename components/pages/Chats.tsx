'use client'
import React, { useEffect, useState } from "react";
import { SendHorizonal, Menu } from "lucide-react";
import ChatApi from "@/lib/ChatApi";
import { useSearchParams, useRouter } from "next/navigation";
import getMessages from "@/lib/getMessages";
import getLastHistory from "@/lib/lastHistory";


interface Message {
  content: string;
  role: 'system' | 'assistant';

}




const Chats = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const [conversationId, setConversationId] = useState(searchParams.get("id") || '');


  const router = useRouter()





  useEffect(() => {
    const api = async () => {
      try {
        const result = await getMessages({ conversationId });


        setMessages([]);

        result.forEach((value: any) => {

          // Handle System Messages
          if (value?.data?.messages?.[0]?.role === 'system') {

            setMessages((prev: any) => [
              ...prev,
              { content: value.data.messages[0].content, role: "system" }
            ]);
          }

          // Handle Assistant Messages from Choices
          if (value?.data?.choices?.[0]?.message?.role === 'assistant') {
            const botMessage = value?.data?.choices?.[0]?.message?.content;

            if (botMessage) {
              setMessages((prev: any) => [
                ...prev,
                { content: botMessage, role: "assistant" }
              ]);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    api();
  }, [conversationId]);






  const handleSubmit = async (e: FormData) => {

 
   



    const inputData: string | null = e.get('input') as string | null
    if (!inputData) return;
    setMessages((prev: any) => [...prev, { content: inputData, role: "system" }]);



    if (inputData) {


      try {
        const result = await ChatApi({ content: inputData,  conversationId });
        const lastHistory = await getLastHistory()
        const botMessage = result?.choices?.[0]?.message?.content;

        setConversationId(lastHistory.data.conversationId)
        router.replace(`/?id=${lastHistory.data.conversationId}`, { scroll: false });

        if (botMessage) {
          setMessages((prev: any) => [...prev, { content: botMessage, role: "assistant" }]);
        }
      } catch (error) {
        console.log(error)

      } finally {
        setThinking(false)
      }





    }




  }




  return (
    <div className="w-full lg:p-7 h-dvh">
      <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full grid lg:grid-rows-[1fr_90px] grid-rows-[70px_1fr_90px]">

        {/* mobile menu */}
        <div className="text-black lg:hidden shadow px-6 flex items-center justify-between ">
          <div className='text-[28px] capitalize font-bold '>
            <p>chatZaar</p>
          </div>
          <Menu size={30} />
        </div>

  


        {/* messages */}
        <div className="text-black flex justify-center items-center flex-col overflow-y-auto ">

          <div className={`lg:w-[35rem]  ${messages.length === 0 ? 'block' : 'hidden'}`}>
            <div className="text-center">
              <h1 className="text-[3rem] font-bold">ChatZaar</h1>
              <p>Interact with ChatZaar, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid dialogue.</p>
            </div>
          </div>

          {messages.map((value: any, index: number) => (
            <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2" key={index}>
              <div className={`flex  ${value.role === 'assistant' ? 'justify-normal' : 'justify-end'}`}>
                <p className="bg-white p-3 rounded-lg shadow-md max-w-[40rem]">{value.content}</p>
              </div>
            </div>
          ))}

          {thinking && (
            <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2">
              <div className="flex justify-normal">
                <p className="thinking-text  p-3 rounded-lg shadow-md max-w-[40rem] italic">
                  Thinking...
                </p>
              </div>
            </div>
          )}




        </div>


        {/* input box */}
        <form className=" w-full flex justify-center pb-5 " action={handleSubmit}>
          <div className="w-[90%] md:w-[70%] flex items-center p-4 bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">

            <input
              type="text"
              name="input"
              placeholder="Type your message..."
              className="flex-1 p-3 text-white bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400"
            />

            <button type="submit" className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all cursor-pointer" onClick={() => setThinking(true)}>
              <SendHorizonal size={20} />
            </button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Chats