"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  footerData: null, // can be object or array based on your footer API
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
