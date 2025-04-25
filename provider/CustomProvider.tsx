'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import WrapperProvider from './WrapperProvider'
import { Toaster } from "@/components/ui/sonner"



const CustomProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    return (
        <Provider store={store}>
            <WrapperProvider>
            <Toaster position='top-center' richColors/>
                {children}
            </WrapperProvider>
        </Provider>
    )
}

export default CustomProvider