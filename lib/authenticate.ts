
const authenticate = async () => {
 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data
 


}

export default authenticate