
import getCookie from "@/services/getCookie";

const getLastHistory = async () => {

    const token = (await getCookie('token'))?.value || '' 
    const userId = (await getCookie('user'))?.value || ''

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/last-history`, {
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

export default getLastHistory