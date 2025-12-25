import getCookie from "@/services/getCookie"


const ChatApi = async ({ content, conversationId, model }: {
  content: string,
  conversationId?: string | null,
  model: string | null
}) => {


  const token = (await getCookie('token'))?.value || ''
  const userId = (await getCookie('user'))?.value || ''


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
      model: model
    }),
  });
  const data = await response.json();
  return data



}

export default ChatApi