import React from 'react'
import { History , Store, LayoutDashboard , HelpCircle, Gem} from 'lucide-react'
import Link from 'next/link'

const NavLink = () => {
    return (
        <div className=' flex flex-col gap-8 px-4'>
            <p className='text-[14px] capitalize'>Engagement</p>

            <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold'>
                <History size={25} />
                <p>history</p>
            </Link>

            <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold'>
                <Store size={25} />
                <p>store</p>
            </Link>

            <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold'>
                <LayoutDashboard size={25} />
                <p>Ai task</p>
            </Link>

            <div className='w-full h-[1px] bg-gray-400' />

            <p className='text-[14px] capitalize'>Help & Support</p>

            <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold'>
                <HelpCircle size={25} />
                <p>support</p>
            </Link>

            <Link href={'/'} className=' capitalize flex items-center gap-3 font-semibold'>
                <Gem size={25} />
                <p>Subscription</p>
            </Link>

        </div>
    )
}

export default NavLink