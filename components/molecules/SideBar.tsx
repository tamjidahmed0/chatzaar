'use client'
import React, { useState, useEffect } from 'react'
import NavLink from '../atoms/NavLink'
import Image from 'next/image'
import credit from '@/lib/credit'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { creditAction } from "@/features/credit";

const SideBar = () => {
    const dispatch = useDispatch()
    const creditValue = useSelector((state: any) => state.credit.credit)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const fetchCredit = async () => {
            setLoading(true)
            try {
                const result = await credit()
                dispatch(creditAction(result.msg))
            } catch (error) {
                console.error("Error fetching credit:", error);

            } finally {
                setLoading(false)
            }

        }
        fetchCredit()

    }, [])


    return (
        <div className=' hidden lg:grid '>
            <div className='text-[28px] capitalize font-bold mt-2 mx-5 text-white flex gap-2 items-center'>
                <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[2rem] h-[2rem] object-cover' />
                <p>chatZaar</p>
            </div>

            <div >
                {loading ? (
                    <div className='bg-[#1e2021] rounded font-semibold p-3 mx-5 text-[14px] animate-pulse'>
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <div className='bg-[#1e2021] rounded font-semibold p-3 mx-5 text-[14px]'>
                        <h1>{creditValue} {creditValue ? 'credits' : 'credit'}</h1>
                    </div>
                )}

            </div>


            <div className=' w-[15rem] mt- '>
                <NavLink />
            </div>


        </div>
    )
}

export default SideBar