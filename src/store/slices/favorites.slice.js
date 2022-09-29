import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const favorites = createSlice({
    name: 'favorites',
    initialState: [],
    reducers:{
        setFavorites: (state,action) => action.payload
    }
})

export const {setFavorites} = favorites.actions

export default favorites.reducer