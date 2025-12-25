'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { createCookie } from '@/services/action'
import Login from '@/lib/Login'


const SignIn = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');


  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    try {
      const respose = await Login({
        email: formData.email,
        password: formData.password
      })
      if (respose.status === 201) {

        const saveCookie = async () => {

          const saveToken = await createCookie({
            name: 'token',
            value: respose.token || '',
            httpOnly: false
          })

          const saveUser = await createCookie({
            name: 'user',
            value: respose.user || '',
            httpOnly: false
          })

          if (saveToken && saveUser) {
            router.push('/')
          }



        }

        saveCookie()






      }
    } catch (error) {
      console.log(error)
    }
  }




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
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="mb-6 flex items-center gap-2 justify-center">
          <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[2rem] h-[2rem] object-cover' />
          <h2 className="text-2xl font-semibold mt-2 text-black capitalize">chatZaar</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition text-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition text-black"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition"
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`)}
        >
          <Image src="/assets/google.png" alt="Google" className="w-5 h-5 mr-2" width={500} height={500} />
          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          By proceeding, you agree to our <a href="#" className="text-blue-500">Terms of Use</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}

export default SignIn