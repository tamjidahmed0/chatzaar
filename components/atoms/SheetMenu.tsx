'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"
import { History, HelpCircle, Gem, Edit, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { deleteCookie } from '@/services/deleteCookie'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '@/features/mobileMenuSlice'
import { useSelector } from 'react-redux'


const SheetMenu = ({
  open,
  setOpen,
  profile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  profile: any;
}) => {

  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useDispatch();
  const creditValue = useSelector((state: any) => state.credit.credit)


  const handleLogout = async () => {
    await deleteCookie()
    router.replace('/authenticate')
  }




  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-black">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl font-bold flex gap-2 items-center">
            <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[2rem] h-[2rem] object-cover' />
            <p>ChatZaar</p>
          </SheetTitle>

          <SheetDescription className='flex flex-col justify-between h-[90dvh] mt-6'>


            <div className='flex flex-col gap-5 px-4 '>

              <div className='bg-[#1e2021] rounded font-semibold p-3  text-[14px]'>
                <h1>{creditValue} {creditValue ? 'credits' : 'credit'}</h1>
              </div>

              <div className=' capitalize flex items-center gap-3 border p-4 rounded-lg cursor-pointer' onClick={() => { window.location.href = '/'; dispatch(toggleMenu()) }}>
                <Edit size={25} />
                new chat
              </div>
              <p className='text-[14px] capitalize'>Engagement</p>

              <Link href={'/history'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/history' && 'bg-[#1e2021]'}`} onClick={() => dispatch(toggleMenu())}>
                <History size={25} />
                <p>history</p>
              </Link>



              <div className='w-full h-[1px] bg-gray-400' />

              <p className='text-[14px] capitalize'>Help & Support</p>

              <Link href={'/support'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/support' && 'bg-[#1e2021]'}`} onClick={() => dispatch(toggleMenu())}>
                <HelpCircle size={25} />
                <p>support</p>
              </Link>

              <Link href={'/subscription'} className={`capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021] ${pathname === '/subscription' && 'bg-[#1e2021]'}`} onClick={() => dispatch(toggleMenu())}>
                <Gem size={25} />
                <p>Subscription</p>
              </Link>

              <div onClick={handleLogout} className=' capitalize flex items-center gap-3 font-semibold p-3 rounded-lg hover:bg-[#1e2021]' >
                <LogOut size={25} />
                <p>Log out</p>
              </div>






            </div>

            <div>
              {profile && (
                <div className="flex items-center gap-3 px-4">
                  <Image
                    src={profile.photo}
                    width={1000}
                    height={1000}
                    alt="avatar"
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                  <div className="text-[15px] w-0 min-w-0 flex-1">
                    <h1 className="font-bold">{profile.name}</h1>
                    <p className="text-gray-400 text-[12px] font-medium break-words whitespace-normal">
                      {profile.email}
                    </p>
                  </div>
                </div>
              )}
            </div>




          </SheetDescription>







        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SheetMenu