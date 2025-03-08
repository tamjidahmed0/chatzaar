import { cookies } from 'next/headers'
 
export default async function hasCookie(name:string) {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has(name)
  return hasCookie
}