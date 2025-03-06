
const ChatApi = async ({content}:{
    content: string,
}) => {
 
    console.log(content)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [
              { role: "system", content }
            ],
            model: "EchoGPT"
          }),
    });
    const data = await response.json();
    return data
 


}

export default ChatApi