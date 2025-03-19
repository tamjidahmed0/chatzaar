'use client'
import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal, Menu } from "lucide-react";
import ChatApi from "@/lib/ChatApi";
import { useSearchParams } from "next/navigation";
import getMessages from "@/lib/getMessages";
import getProfile from "@/lib/getProfile";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ObjectId } from 'bson';
import SheetMenu from "../atoms/SheetMenu";



interface Message {
  content: string;
  role: 'system' | 'assistant';

}

interface Profile {
  photo: string;
  name: string;
  email: string;
}


const Chats = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState<boolean>(false)
  const [profile, setProfile] = useState<Profile | null>(null);
  const searchParams = useSearchParams()
  const [conversationId, setConversationId] = useState<string | null>(searchParams.get("id") || null);
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");




  useEffect(() => {
    const storedModel = localStorage.getItem("selectedModel");
    if (storedModel) {
      setSelectedModel(storedModel);
    }
  }, []);


  useEffect(() => {

    localStorage.setItem("selectedModel", selectedModel);
  }, [selectedModel]);


  useEffect(() => {

    const request = async () => {
      const results = await getProfile()
      setProfile(results)
    }

    request()

  }, [])


  useEffect(() => {
    const api = async () => {
      try {
        const result = await getMessages({ conversationId });
        setMessages(result)

      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    api();
  }, [conversationId]);



  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [messages]);


  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    console.log(e.target.value, 'model')
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData: string | null = formData.get('input') as string | null;


    if (!inputData) return;
    setMessages((prev: any) => [...prev, { content: inputData, role: "system" }]);
    setInputValue("");

    const generateObjectId = () => {
      return new ObjectId().toHexString();
    };

    const newId = generateObjectId()


    if (inputData) {

      try {

        if (conversationId == null) {
          const result = await ChatApi({ content: inputData, conversationId: newId, model: selectedModel });
          setMessages((prev: any) => [...prev, result]);
          history.pushState(null, "", `/?id=${newId}`)
          setConversationId(newId)
        } else {
          const result = await ChatApi({ content: inputData, conversationId, model: selectedModel });

          setMessages((prev: any) => [...prev, result]);
          history.pushState(null, "", `/?id=${conversationId}`)
        }

      } catch (error) {
        console.log(error)

      } finally {
        setThinking(false)
      }





    }




  }



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };





  return (
    <div className="w-full lg:p-7 h-dvh">

      <SheetMenu open={open} setOpen={setOpen} profile={profile} />

      <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full grid lg:grid-rows-[1fr_90px] grid-rows-[70px_1fr_90px]">

        {/* mobile menu */}
        <div className="text-black lg:hidden shadow px-6 flex items-center justify-between ">
          <div className='text-[28px] capitalize font-bold '>
            <p>chatZaar</p>
          </div>
          <Menu size={30} onClick={() => setOpen(true)} />
        </div>




        {/* messages */}
        <div className="text-black flex  items-center flex-col overflow-y-auto " >

          {/* <div ref={scrollRef} /> */}
          <div className={`lg:w-[35rem]  h-full flex items-center  ${messages.length === 0 ? 'block' : 'hidden'}`}>
            <div className="text-center">
              <h1 className="text-[3rem] font-bold">ChatZaar</h1>
              <p>Interact with ChatZaar, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid dialogue.</p>
            </div>
          </div>

          {messages.map((value: any, index: number) => (
            <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 py-3" key={index} >
              <div className={`flex  ${value.role === 'assistant' ? 'justify-normal' : 'justify-end'}`}>
                <p className="bg-white p-3 rounded-lg shadow-md lg:max-w-[40rem] max-w-full break-words ">
                  <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {value.content}
                    </ReactMarkdown>
                  </div>

                </p>

              </div>

            </div>

          ))}

          <div ref={scrollRef} />

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

        <form className=" w-full flex justify-center pb-5" onSubmit={handleSubmit}>


          <div className="w-[100%] md:w-[70%] flex items-center p-4 bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">

            <select
              name="model"
              value={selectedModel}
              onChange={handleModelChange}
              className="w-full sm:w-auto px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none text-left truncate"
            >
              {/* <option value="gpt-3.5">GPT-3.5</option> */}
              <option value="gpt-4o">GPT-4o</option>
              <option value="gpt-4o-mini">GPT-4o mini</option>
              <option value="DeepSeek-V3">DeepSeek-V3</option>
            </select>

            <input
              type="text"
              name="input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-3 text-white bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400"

            />



            <button type="submit" className={`ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all cursor-pointer ${thinking ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setThinking(true)}>
              <SendHorizonal size={20} />
            </button>
          </div>
        </form>











      </div>

    </div>
  )
}

export default Chats