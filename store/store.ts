import { configureStore } from '@reduxjs/toolkit'
import mobileMenuReducer from '../features/mobileMenuSlice'
import creditReducer from '../features/credit'

export const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
    credit: creditReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch