import getCookie from "@/services/getCookie";

const deleteHistory = async (conversationId: string | null) => {
    const token = (await getCookie('token'))?.value || '';
    const userId = (await getCookie('user'))?.value || '';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete-history/${conversationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'user-id': userId,
        },
    });

    
    const data = await response.json();
    return data; 
};

export default deleteHistory;
