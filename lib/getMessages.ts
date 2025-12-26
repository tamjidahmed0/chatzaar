import getCookie from "@/services/getCookie";


const getMessages = async ({conversationId,}:{

    conversationId: string | null,
 
}) => {

    const token = (await getCookie('token'))?.value || ''
    const userId = (await getCookie('user'))?.value || ''
 
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-messages/${conversationId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'user-id': userId,
        },
    });
    const data = await response.json();
    return data
 


}

export default getMessages