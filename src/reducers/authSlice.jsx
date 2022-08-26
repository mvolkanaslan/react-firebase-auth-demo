import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name:"auth",
    initialState:{
        currentUser :false,
        reAuth : false
    },
    reducers:{
        setCurrentUser:(state,action)=>{
            state.currentUser = action.payload;
        },
        reAuthState:(state,action)=>{
            state.reAuth = action.payload;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;