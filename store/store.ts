import { configureStore } from '@reduxjs/toolkit'
import mobileMenuReducer from '../features/mobileMenuSlice'

export const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch