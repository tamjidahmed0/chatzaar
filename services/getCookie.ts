'use server'
import { cookies } from 'next/headers'
 
export default async function getCookie(name: string) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(name)
  return cookie
}