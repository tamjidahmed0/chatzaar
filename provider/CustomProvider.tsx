'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import WrapperProvider from './WrapperProvider'




const CustomProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    return (
        <Provider store={store}>
            <WrapperProvider>
                {children}
            </WrapperProvider>
        </Provider>
    )
}

export default CustomProvider