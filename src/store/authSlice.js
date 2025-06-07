import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    loading: true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status =true;
            state.userData = action.payload.userData;
            state.loading = false;
        },

        logout: (state,action)=>{
            state.status = false;
            state.userData = null;
            state.loading = false;
        }
    }
})

export const{login,logout}= authSlice.actions;
export default authSlice.reducer;