import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers:{
        setCart: (state,action) =>action.payload
    }
})

export const {setCart} = cart.actions

export const getCart = () => (dispatch) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`,config)
        .then(res=> dispatch(setCart(res.data.data.cart.products)))
        .catch(error => {
            console.log(error)
            if(error.response.data.message === "Cart not found"){
                dispatch(setCart([]))
            }
        
        })
}

export const plus = (id) => (dispatch)=>{
    let filter=[]
    cart?.map( product => {
        if(product?.id === id ){
            filter.push(product)
        }
    })

    dispatch(setCart(filter))
}

export default cart.reducer