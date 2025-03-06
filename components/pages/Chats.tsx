'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bolt, Bell, SendHorizonal, Menu } from "lucide-react";
import ChatApi from "@/lib/ChatApi";


const Chats = () => {

  const [messages, setMessages] = useState<any>([])
  const [thinking, setThinking] = useState<boolean>(false)




  const handleSubmit = async (e: FormData) => {

    const inputData: string | null = e.get('input') as string | null
    if (!inputData) return;
    setMessages((prev: any) => [...prev, { content: inputData, role: "system" }]);



    if (inputData) {


      try {
        const result = await ChatApi({ content: inputData });
        const botMessage = result?.choices?.[0]?.message?.content;
        console.log(result)
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



  console.log(messages)

  return (
    <div className="w-full lg:p-7 h-dvh">
      <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full grid lg:grid-rows-[100px_1fr_90px] grid-rows-[70px_1fr_90px]">

        {/* mobile menu */}
        <div className="text-black lg:hidden shadow px-6 flex items-center justify-between">
          <div className='text-[28px] capitalize font-bold '>
            <p>chatZaar</p>
          </div>
          <Menu size={30} />
        </div>

        {/* desktop profile */}
        <div className="lg:flex justify-end py-5 px-4 hidden">
          <div className="flex items-center gap-3">
            <Image
              src={'https://images.unsplash.com/photo-1599566150163-29194dcaad36'}
              width={1000}
              height={1000}
              alt="avatar"
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <div className="text-[15px]">
              <h1 className="text-black font-bold">Tamjid Ahmed</h1>
              <p className="text-gray-400 font-medium">tamjidahmedofficial</p>
            </div>
          </div>
          <div className="w-[1px] bg-gray-400 mx-5" />
          <div className="text-black flex items-center gap-4">
            <Bell size={25} />
            <Bolt size={25} />
          </div>
        </div>



        {/* messages */}
        <div className="text-black flex justify-center items-center flex-col overflow-y-auto ">

          <div className={`lg:w-[35rem]  ${messages.length === 0 ? 'block' : 'hidden'}`}>
            <div className="text-center">
              <h1 className="text-[3rem] font-bold">ChatZaar</h1>
              <p>Interact with ChatZaar, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid dialogue.</p>
            </div>
          </div>


          {/* {messages.map((value: any, index: number) => (
            <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2" key={index}>
              <div className={`flex space-y-14  ${value.role === 'assistant' ? ' justify-normal' : 'justify-end'}`}>
                <p className="bg-white p-3  rounded-lg shadow-md max-w-[40rem]">{value.content}</p>

              </div>
            


            </div>

          ))} */}



          {messages.map((value: any, index: number) => (
            <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2" key={index}>
              <div className={`flex space-y-14 ${value.role === 'assistant' ? 'justify-normal' : 'justify-end'}`}>
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
          <div className="w-[90%] md:w-[70%] flex items-center p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">

            <input
              type="text"
              name="input"
              placeholder="Type your message..."
              className="flex-1 p-3 text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400"
            />

            <button type="submit" className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all" onClick={() => setThinking(true)}>
              <SendHorizonal size={20} />
            </button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Chats