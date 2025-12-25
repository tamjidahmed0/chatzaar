'use server'
import { cookies } from 'next/headers';


export async function deleteCookie() {
    const cookieStore = await cookies()

    cookieStore.getAll().forEach((cookie) => {
        cookieStore.delete(cookie.name);
    });

}