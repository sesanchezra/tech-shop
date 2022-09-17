import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: 'user',
    initialState: '',
    reducers:{
        setUser: (state,action) => action.payload
    }
})

export const {setUser} = user.actions

export default user.reducer