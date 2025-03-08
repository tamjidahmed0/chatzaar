import getCookie from "@/services/getCookie"


const ChatApi = async ({ content, conversationId }: {
  content: string,
  conversationId?: string
}) => {


  const token = (await getCookie('token'))?.value || ''
  const userId = (await getCookie('user'))?.value || ''

  console.log(conversationId, 'conversation id')
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/chats`;
  if (conversationId) {
    url += `?conversationId=${conversationId}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'user_id': userId,
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