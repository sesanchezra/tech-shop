import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import favorites from './slices/favorites.slice'

export default configureStore({
    reducer:{
        products,
        favorites
    }
})