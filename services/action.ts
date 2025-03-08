'use server'

import { cookies } from 'next/headers'

export async function createCookie({
    name,
    value,
    httpOnly

}: {
    name: string,
    value: string,
    httpOnly?: boolean
}) {
    const cookieStore = await cookies()

    cookieStore.set({
        name: name,
        value: value,
        httpOnly: httpOnly,

    })



    const savedCookie = cookieStore.get(name);
        return savedCookie?.value === value;
}