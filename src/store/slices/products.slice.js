import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const products = createSlice({
    name: 'products',
    initialState: [],
    reducers:{
        setProducts: (state,action) =>action.payload
    }
})

export const {setProducts} = products.actions

export const getProducts = () => (dispatch) =>{
    axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .catch(error => console.log(error))
}

export default products.reducer