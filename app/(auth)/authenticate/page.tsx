'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { createCookie } from '@/services/action'

const SignIn = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');



  useEffect(() => {
   
    const saveCookie = async () => {

      if (token && userId) {

        const saveToken = await createCookie({
          name: 'token',
          value: token || '',
          httpOnly: false
        })

        const saveUser = await createCookie({
          name: 'user',
          value: userId || '',
          httpOnly: false
        })

        if (saveToken && saveUser) {
          router.push('/')
        }

      }



    }

    saveCookie()



  }, [token, userId, router])







  return (
    <div className="flex items-center justify-center min-h-dvh bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6 flex items-center gap-2 justify-center">
          <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[2rem] h-[2rem] object-cover' />
          <h2 className="text-2xl font-semibold mt-2 text-black capitalize">chatZaar</h2>
        </div>
        <button className="flex items-center justify-center w-full bg-purple-600 cursor-pointer text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition" onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`)}>
          <Image src="/assets/google.png" alt="Google" className="w-5 h-5 mr-2 " width={500} height={500} />
          Sign in with Google
        </button>
        <p className="text-xs text-gray-400 mt-4">
          By proceeding, you agree to our <a href="#" className="text-blue-500">Terms of Use</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}

export default SignIn