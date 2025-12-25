import getCookie from "@/services/getCookie"


const getHistory = async () => {

    const token = (await getCookie('token'))?.value || ''
    const userId = (await getCookie('user'))?.value || ''


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'user_id': userId,
        },
    });
    const data = await response.json();
    return data



}

export default getHistory