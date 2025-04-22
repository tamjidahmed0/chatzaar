import React from 'react'
import NavLink from '../atoms/NavLink'
import Image from 'next/image'

const SideBar = () => {
    return (
        <div className=' hidden lg:block'>
            <div className='text-[28px] capitalize font-bold mt-10 mx-5 text-white flex gap-2 items-center'>
                <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[2rem] h-[2rem] object-cover' />
                <p>chatZaar</p>
            </div>


            <div className=' w-[15rem] mt-7 '>
                <NavLink />

            </div>
    

        


        </div>
    )
}

export default SideBar