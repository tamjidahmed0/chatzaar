import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, 
};

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen; 
    },
 
  },
});

export const { toggleMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
