'use client'
import React from 'react'
import { Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '@/features/mobileMenuSlice'


const MobileHeader = () => {
  const dispatch = useDispatch();



  return (
    <div className="text-black h-full border  px-6 flex items-center justify-between ">
      <div className='text-[28px] capitalize font-bold '>
        <p>chatZaar</p>
      </div>
      <Menu size={30} onClick={() => dispatch(toggleMenu())} />
    </div>
  )
}

export default MobileHeader