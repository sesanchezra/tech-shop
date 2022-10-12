import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './OrderCard.css'

const months = [
    { '1': 'January' },
    { '2': 'February' },
    { '3': 'March' },
    { '4': 'April' },
    { '5': 'May' },
    { '6': 'June' },
    { '7': 'July' },
    { '8': 'August' },
    { '9': 'September' },
    { '10': 'October' },
    { '11': 'November' },
    { '12': 'December' }
]
const OrderCard = ({ purchase }) => {

    const products = useSelector(state => state.products)
    // console.log(products)

    let initialDate = purchase.createdAt
    let initialDateSplit = initialDate.split('T')[0]
    let date = initialDateSplit.split('-')

    let filterMonth = months.filter(month => {
        if (Number(Object.keys(month)[0]) === Number(date[1])) {
            return Object.values(month)
        }
    })



    return (
        <div className='OrderCard'>
            <div className='OrderCard__date'>
                <span>{`${Object.values(filterMonth[0])} ${date[0]} , ${date[2]}`}</span>
            </div>
            {
                purchase?.cart.products.map((product, index) => (
                    <div className='OrderCard__products' key={index}>
                        <div className='OrderCard__product'>
                            <div className='product__img'>
                                {
                                    products?.map((prod,index) => (
                                        prod?.id === product?.id &&
                                        <img src={prod?.productImgs[0]} alt="image" className='product__img__box' key={index}/>
                                    ))
                                }
                                
                            </div>
                            <div className='product__description'>
                                <p>
                                    {product.title}
                                </p>
                                
                                <span>Quantity: {`${product?.productsInCart.quantity}`}</span>
                            </div>
                            <div className='product__price'>
                                <h3>${`${product?.productsInCart.quantity * product?.price}`}</h3>
                            </div>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}

export default OrderCard
