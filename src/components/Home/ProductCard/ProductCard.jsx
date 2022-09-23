import React from 'react'
import './ProductCard.css'

const ProductCard = ({product}) => {
    return (
        <div className='ProductCard'>
            <div className='images'>
                {
                    product.productImgs.map(image => (
                        <img src={image} alt={image} className='images__item'/>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductCard
