// 'use client'
// import React, { useEffect, useRef, useState } from "react";
// import { SendHorizonal } from "lucide-react";
// import ChatApi from "@/lib/ChatApi";
// import { useSearchParams } from "next/navigation";
// import getMessages from "@/lib/getMessages";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import { ObjectId } from 'bson';
// import ConversationSkeleton from "@/skeleton/ConversationSkeleton";
// import Image from "next/image";
// import { toast } from "sonner"
// import moment from "moment";
// import { useDispatch } from "react-redux";
// import { creditAction } from "@/features/credit";

// interface Message {
//   content: string;
//   role: 'system' | 'assistant';

// }




// const Chats = () => {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [thinking, setThinking] = useState<boolean>(false)
//   const searchParams = useSearchParams()
//   const [conversationId, setConversationId] = useState<string | null>(searchParams.get("id") || null);
//   const scrollRef = useRef<HTMLDivElement | null>(null)
//   const [inputValue, setInputValue] = useState<string>("");
//   const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");
//   const [loading, setLoading] = useState<boolean>(true)
//   const dispatch = useDispatch();


//   useEffect(() => {
//     const storedModel = localStorage.getItem("selectedModel");
//     if (storedModel) {
//       setSelectedModel(storedModel);
//     }
//   }, []);


//   useEffect(() => {

//     localStorage.setItem("selectedModel", selectedModel);
//   }, [selectedModel]);




//   useEffect(() => {
//     const api = async () => {
//       setLoading(true)
//       try {
//         const result = await getMessages({ conversationId });
//         setMessages(result)


//       } catch (error) {
//         console.error("Error fetching messages:", error);

//       } finally {
//         setLoading(false)
//       }
//     };

//     api();
//   },[] );



//   useEffect(() => {

//     if (conversationId === null) {
//       setLoading(false)
//     }


//   })



//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end'
//       })
//     }
//   }, [messages]);


//   const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedModel(e.target.value);

//   };



//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const inputData: string | null = formData.get('input') as string | null;


//     if (!inputData) return;
//     setMessages((prev: any) => [...prev, { content: inputData, role: "system" }]);
//     setInputValue("");

//     const generateObjectId = () => {
//       return new ObjectId().toHexString();
//     };

//     const newId = generateObjectId()


//     if (inputData) {

//       try {

//         if (conversationId == null) {
//           const result = await ChatApi({ content: inputData, conversationId: newId, model: selectedModel });

//           if(result.status === 403){
//             const localTime = moment(result.msg).local().format("DD MMMM YYYY, hh:mm A");
//             toast.error(`Please wait until: ${localTime}`);
//           }else{
     
//             setMessages((prev: any) => [...prev, result?.message]);
//             dispatch(creditAction(result.credits))
//             history.pushState(null, "", `/?id=${newId}`)
//             setConversationId(newId)
//           }
         
//         } else {
//           const result = await ChatApi({ content: inputData, conversationId, model: selectedModel });
//           if(result.status === 403){
//             const localTime = moment(result.msg).local().format("DD MMMM YYYY, hh:mm A");     
//             toast.error(`Please wait until: ${localTime}`);
//           }else{
//             setMessages((prev: any) => [...prev, result?.message]);
//             dispatch(creditAction(result?.credits))
//             history.pushState(null, "", `/?id=${conversationId}`)
//           }
       
//         }

//       } catch (error) {
//         console.log(error)

//       } finally { 
//         setThinking(false)
//       }





//     }




//   }



//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setInputValue(event.target.value);
//   };



//   return (
//     <div className="w-full lg:p-7 h-full">
         

//       <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full grid grid-rows-[1fr_160px]">

//         {/* messages */}
//         <div className="text-black flex  items-center flex-col overflow-y-auto " >


//           {loading ? (
//             <ConversationSkeleton />
//           ) : (

//             <>

//               <div className={`lg:w-[35rem] h-full flex items-center  ${messages.length === 0 ? 'block' : 'hidden'}`}>
                
//                 <div className="text-center ">
//                   <div className="flex items-center gap-2 justify-center mb-3 ">
//                   <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[3rem] h-[3rem] object-cover' />
//                   <h1 className="text-[3rem] font-bold">ChatZaar</h1>
//                   </div>
//                   <p>Interact with ChatZaar, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid dialogue.</p>
//                 </div>

//               </div>
//               {messages.map((value: any, index: number) => (
//                 <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 py-3" key={index} >
//                   <div className={`flex  ${value?.role === 'assistant' ? 'justify-normal' : 'justify-end'}`}>
//                     <span className="bg-white p-3 rounded-lg shadow-md lg:max-w-[40rem] max-w-full break-words ">
//                       <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full">
//                         <ReactMarkdown
//                           remarkPlugins={[remarkGfm]}
//                           rehypePlugins={[rehypeHighlight]}
//                         >
//                           {value?.content}
//                         </ReactMarkdown>
//                       </div>

//                     </span>

//                   </div>

//                 </div>

//               ))}


//           {thinking && (
//             <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2">
//               <div className="flex justify-normal">
//                 <p className="thinking-text  p-3 rounded-lg shadow-md max-w-[40rem] italic">
//                   Thinking...
//                 </p>
//               </div>
//             </div>
//           )}


//             </>
//           )}



//           <div ref={scrollRef} />
// {/* 
//           {thinking && (
//             <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2">
//               <div className="flex justify-normal">
//                 <p className="thinking-text  p-3 rounded-lg shadow-md max-w-[40rem] italic">
//                   Thinking...
//                 </p>
//               </div>
//             </div>
//           )} */}

//         </div>


//         {/* input box */}

//         <form className=" w-full flex justify-center pb-5" onSubmit={handleSubmit}>


//           <div className="lg:w-[70%] w-[90%] flex flex-col gap-1 p-4 bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">


//             <div className="w-full flex items-center">

//               <textarea
//                 name="input"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 placeholder="Type your message..."
//                 className="flex-1 p-3 text-white bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 resize-none"
//                 rows={2}

//               ></textarea>


//               <button type="submit" className={`ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all cursor-pointer ${thinking ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setThinking(true)}>
//                 <SendHorizonal size={20} />
//               </button>
//             </div>


//             <div className="lg:w-full w-40">
//               <select
//                 name="model"
//                 value={selectedModel}
//                 onChange={handleModelChange}
//                 className="w-full sm:w-auto px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none text-left truncate"
//               >

//                 <option value="gpt-4o">GPT-4o</option>
//                 <option value="gpt-4o-mini">GPT-4o mini</option>

//               </select>
//             </div>



//           </div>

//         </form>

//       </div>

//     </div>
//   )
// }

// export default Chats










'use client'
import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import ChatApi from "@/lib/ChatApi";
import { useSearchParams } from "next/navigation";
import getMessages from "@/lib/getMessages";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ObjectId } from 'bson';
import ConversationSkeleton from "@/skeleton/ConversationSkeleton";
import Image from "next/image";
import { toast } from "sonner"
import moment from "moment";
import { useDispatch } from "react-redux";
import { creditAction } from "@/features/credit";

interface Message {
  content: string;
  role: 'system' | 'assistant';
}

const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");
  const [loading, setLoading] = useState<boolean>(true)
  const [isClient, setIsClient] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Handle client-side only code
  useEffect(() => {
    setIsClient(true);
    const id = searchParams.get("id");
    setConversationId(id);
    
    const storedModel = localStorage.getItem("selectedModel");
    if (storedModel) {
      setSelectedModel(storedModel);
    }
  }, [searchParams]);

  // Save selected model to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("selectedModel", selectedModel);
    }
  }, [selectedModel, isClient]);

  // Fetch messages
  useEffect(() => {
    if (!isClient) return;

    const api = async () => {
      if (conversationId === null) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getMessages({ conversationId });
        setMessages(result || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    api();
  }, [conversationId, isClient]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, thinking]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData: string | null = formData.get('input') as string | null;

    if (!inputData || !inputData.trim()) return;
    
    setThinking(true);
    setMessages((prev) => [...prev, { content: inputData, role: "system" }]);
    setInputValue("");

    const generateObjectId = () => {
      return new ObjectId().toHexString();
    };

    const newId = conversationId || generateObjectId();

    try {
      const result = await ChatApi({ 
        content: inputData, 
        conversationId: newId, 
        model: selectedModel 
      });

      if (result?.status === 403) {
        const localTime = moment(result.msg).local().format("DD MMMM YYYY, hh:mm A");
        toast.error(`Please wait until: ${localTime}`);
        // Remove the user message if request failed
        setMessages((prev) => prev.slice(0, -1));
      } else if (result?.message) {
        setMessages((prev) => [...prev, result.message]);
        
        if (result?.credits !== undefined) {
          dispatch(creditAction(result.credits));
        }
        
        if (!conversationId) {
          setConversationId(newId);
          if (typeof window !== 'undefined') {
            window.history.pushState(null, "", `/?id=${newId}`);
          }
        } else {
          if (typeof window !== 'undefined') {
            window.history.pushState(null, "", `/?id=${conversationId}`);
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      // Remove the user message if request failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setThinking(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  // Don't render until client-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full lg:p-7 h-full">
      <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full grid grid-rows-[1fr_160px]">
        {/* messages */}
        <div className="text-black flex items-center flex-col overflow-y-auto">
          {loading ? (
            <ConversationSkeleton />
          ) : (
            <>
              <div className={`lg:w-[35rem] h-full flex items-center ${messages.length === 0 ? 'block' : 'hidden'}`}>
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center mb-3">
                    <Image 
                      src={'/logo.png'} 
                      alt='logo' 
                      width={100} 
                      height={100} 
                      className='w-[3rem] h-[3rem] object-cover' 
                    />
                    <h1 className="text-[3rem] font-bold">ChatZaar</h1>
                  </div>
                  <p>Interact with ChatZaar, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid dialogue.</p>
                </div>
              </div>

              {messages.map((value, index) => (
                <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 py-3" key={index}>
                  <div className={`flex ${value?.role === 'assistant' ? 'justify-normal' : 'justify-end'}`}>
                    <span className="bg-white p-3 rounded-lg shadow-md lg:max-w-[40rem] max-w-full break-words">
                      <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {value?.content || ""}
                        </ReactMarkdown>
                      </div>
                    </span>
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="2xl:w-[70rem] md:w-[35rem] w-full px-4 md:px-0 my-2">
                  <div className="flex justify-normal">
                    <p className="thinking-text p-3 rounded-lg shadow-md max-w-[40rem] italic">
                      Thinking...
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={scrollRef} />
        </div>

        {/* input box */}
        <form className="w-full flex justify-center pb-5" onSubmit={handleSubmit}>
          <div className="lg:w-[70%] w-[90%] flex flex-col gap-1 p-4 bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">
            <div className="w-full flex items-center">
              <textarea
                name="input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 p-3 text-white bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                rows={2}
                disabled={thinking}
              ></textarea>

              <button 
                type="submit" 
                disabled={thinking || !inputValue.trim()}
                className={`ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all ${thinking || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <SendHorizonal size={20} />
              </button>
            </div>

            <div className="lg:w-full w-40">
              <select
                name="model"
                value={selectedModel}
                onChange={handleModelChange}
                disabled={thinking}
                className="w-full sm:w-auto px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none text-left truncate"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4o-mini">GPT-4o mini</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chats;