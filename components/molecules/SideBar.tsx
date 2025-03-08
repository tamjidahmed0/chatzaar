import React from 'react'
import NavLink from '../atoms/NavLink'

const SideBar = () => {
    return (
        <div className=' hidden lg:block'>
            <div className='text-[28px] capitalize font-bold mt-10 mx-5 text-white'>
                <p>chatZaar</p>
            </div>

            <div className=' w-[15rem] mt-10'>
                <NavLink />

            </div>


        </div>
    )
}

export default SideBar