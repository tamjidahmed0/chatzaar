'use client'
import React from 'react'
import { Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '@/features/mobileMenuSlice'
import Image from 'next/image'



const MobileHeader = () => {
  const dispatch = useDispatch();



  return (
    <div className="text-black h-full border  px-6 flex items-center justify-between ">
      <div className='text-[24px] capitalize font-bold flex gap-2 items-center'>
         <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[2rem] h-[2rem] object-cover' />
        <p>chatZaar</p>
      </div>
      <Menu size={30} onClick={() => dispatch(toggleMenu())} />
    </div>
  )
}

export default MobileHeader