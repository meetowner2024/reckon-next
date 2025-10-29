"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactData: null, 
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (state, action) => {
      state.contactData = action.payload;
    },
  },
});

export const {setContactData} = contactSlice.actions;
export default contactSlice.reducer;
