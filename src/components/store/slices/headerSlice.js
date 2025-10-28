import { createSlice } from "@reduxjs/toolkit";
const initialState={
    header:{}
}
const headerSlice=createSlice({
    name:"header",
    initialState,
    reducers:{
        setHeader:(state, action)=>{
           state.header=action.payload
        }
    }
})

export  const {setHeader} =headerSlice.actions
export default headerSlice.reducer
