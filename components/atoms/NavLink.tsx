'use client'
import React, { useEffect, useState } from 'react'
import { History, Store, LayoutDashboard, HelpCircle, Gem, Edit, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import getProfile from '@/lib/getProfile'
import { usePathname } from 'next/navigation';



interface Profile {
    photo: string;
    name: string;
    email: string;
}


const NavLink = () => {
    const [result, setResult] = useState<Profile | null>(null);
    const pathname = usePathname()

    useEffect(() => {

        const request = async () => {
            const results = await getProfile()
            setResult(results)
            console.log(results)
        }

        request()

    }, [])





    return (
        <div className='flex flex-col'>


            <div className='flex flex-col gap-4 px-4 overflow-y-auto h-[80dvh]'>
                <div className=' capitalize flex items-center gap-3 border p-4 rounded-lg cursor-pointer' onClick={() => window.location.href = '/'}>
                    <Edit size={25} />
                    new chat
                </div>
                <p className='text-[14px] capitalize'>Engagement</p>

                <Link href={'/history'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/history' && 'bg-[#1e2021]'}`}>
                    <History size={25} />
                    <p>history</p>
                </Link>
                <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]'>
                    <Store size={25} />
                    <p>store</p>
                </Link>

                <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]'>
                    <LayoutDashboard size={25} />
                    <p>Ai task</p>
                </Link>

                <div className='w-full h-[1px] bg-gray-400' />

                <p className='text-[14px] capitalize'>Help & Support</p>

                <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]'>
                    <HelpCircle size={25} />
                    <p>support</p>
                </Link>

                <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]'>
                    <Gem size={25} />
                    <p>Subscription</p>
                </Link>


                <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]'>
                    <LogOut size={25} />
                    <p>Log out</p>
                </Link>




            </div>

            {result && (
                <div className="flex items-center gap-3 px-4">
                    <Image
                        src={result.photo}
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
    )
}

export default NavLink