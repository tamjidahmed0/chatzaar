import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState :{ credit: number} = {
  credit: 0 , 
};

const credit = createSlice({
  name: "credit",
  initialState,
  
  reducers: {
    creditAction: (state, action: PayloadAction<number>) => {
      state.credit = action.payload;
    },
 
  },
});

export const { creditAction } = credit.actions;
export default credit.reducer;
