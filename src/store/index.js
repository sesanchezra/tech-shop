import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import favorites from './slices/favorites.slice'
import cart from './slices/cart.slice'

export default configureStore({
    reducer:{
        products,
        favorites,
        cart
    }
})