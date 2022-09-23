import React from 'react'
import './ProductCard.css'
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from 'react-icons/lib';

const ProductCard = ({ product }) => {
    return (
        <div className='ProductCard'>
            <div className='images'>
                {
                    product.productImgs.map(image => (
                        <img src={image} alt={image} className='images__item' />
                    ))
                }
            </div>
            <div className='footer'>
                <div className='description'>
                    <h3>{product.title}</h3>
                    <h5>{product.category.name}</h5>
                </div>
                <IconContext.Provider value={{ size: '1.7em', color: 'white' }}>
                    <button className='cart__button'>
                        <GiShoppingBag />
                    </button>
                </IconContext.Provider>


            </div>
        </div>
    )
}

export default ProductCard
