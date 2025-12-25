import React, { useState, useEffect } from 'react'
import SheetMenu from '@/components/atoms/SheetMenu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleMenu } from '@/features/mobileMenuSlice'
import getProfile from '@/lib/getProfile'





interface Profile {
    photo: string;
    name: string;
    email: string;
}


const WrapperProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {


    const [profile, setProfile] = useState<Profile | null>(null);
    const dispatch = useDispatch();

    const isOpen = useSelector((state: RootState) => state.mobileMenu.isOpen);

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const result = await getProfile()
                setProfile(result)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()



    }, [])


    return (
        <div>
            <SheetMenu open={isOpen} setOpen={() => dispatch(toggleMenu())} profile={profile} />
            {children}
        </div>
    )
}

export default WrapperProvider