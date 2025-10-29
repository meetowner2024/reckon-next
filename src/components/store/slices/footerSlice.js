"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  footerData: null, 
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    setFooterData: (state, action) => {
      state.footerData = action.payload;
    },
  },
});

export const { setFooterData } = footerSlice.actions;
export default footerSlice.reducer;
