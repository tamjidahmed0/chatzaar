'use client'
import React, { useEffect, useState } from 'react'
import { History, HelpCircle, Gem, Edit, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import getProfile from '@/lib/getProfile'
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from '@/services/deleteCookie'


interface Profile {
    photo: string;
    name: string;
    email: string;
}


const NavLink = () => {
    const [result, setResult] = useState<Profile | null>(null);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {

        const request = async () => {
            const results = await getProfile()
            setResult(results)

        }

        request()

    }, [])


    const handleLogout = async () => {
        await deleteCookie()
        router.replace('/authenticate')
    }




    return (

        //  h-[85dvh]
        <div className='flex flex-col justify-between  h-[70dvh]'>

            <div className='flex flex-col gap-4 px-4 overflow-y-auto'>
                <div className=' capitalize flex items-center gap-3 border p-4 rounded-lg cursor-pointer' onClick={() => window.location.href = '/'}>
                    <Edit size={25} />
                    new chat
                </div>
                <p className='text-[14px] capitalize'>Engagement</p>

                <Link href={'/history'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/history' && 'bg-[#1e2021]'}`}>
                    <History size={25} />
                    <p>history</p>
                </Link>



                <div className='w-full h-[1px] bg-gray-400' />

                <p className='text-[14px] capitalize'>Help & Support</p>

                <Link href={'/support'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/support' && 'bg-[#1e2021]'}`}>
                    <HelpCircle size={25} />
                    <p>support</p>
                </Link>

                <Link href={'/subscription'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/subscription' && 'bg-[#1e2021]'}`}>
                    <Gem size={25} />
                    <p>Subscription</p>
                </Link>


                <div onClick={handleLogout} className=' cursor-pointer capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]'>
                    <LogOut size={25} />
                    <p>Log out</p>
                </div>




            </div>


            <div>
                {result && (
                    <div className="flex items-center gap-3 px-4">
                        <Image
                            src={result.photo || '/avatar.png'}
                            width={1000}
                            height={1000}
                            alt="avatar"
                            className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                        <div className="text-[15px] w-0 min-w-0 flex-1">
                            <h1 className="font-bold">{result.name}</h1>
                            <p className="text-gray-400 font-medium break-words whitespace-normal">
                                {result.email}
                            </p>
                        </div>
                    </div>
                )}
            </div>











        </div>
    )
}

export default NavLink