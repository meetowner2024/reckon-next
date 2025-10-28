"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectsDropdown: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsDropdown: (state, action) => {
      state.projectsDropdown = action.payload;
    },
  },
});

export const { setProjectsDropdown } = projectsSlice.actions;
export default projectsSlice.reducer;
