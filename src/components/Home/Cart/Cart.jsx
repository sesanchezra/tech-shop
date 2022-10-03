import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import Empty from '../../../assets/Cart.png'
import '../Cart/Cart.css'
import { BiArrowBack } from "react-icons/bi";
import TechLogo from '../../../assets/TechLogo-Grey.png'

const Cart = ({homeToggle}) => {

    const [cart, setCart] = useState([])

    useEffect(() => {

        const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart/'

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(URL, config)
            .then(res => {
                setCart(res.data.data.cart.products)
            })
            .catch(error => {
                console.log(error)
                setCart('')
            })

        // const data = {
        //     "street": "Green St. 1456",
        //     "colony": "Southwest",
        //     "zipCode": 12345,
        //     "city": "USA",
        //     "references": "Some references"
        // }
        // axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases',data,config)
        //     .then(res => console.log(res.data))
        //     .catch( error => console.log(error))
    }, [])

    console.log(cart)

    return (
        <div className='cart'>
            <div className='cart__header'>
                <IconContext.Provider value={{ size: '1.6em', color: 'rgb(19, 19, 19)' }}>
                    <button className='header__button' onClick={homeToggle}>
                        <BiArrowBack />
                    </button>
                </IconContext.Provider>
                <img src={TechLogo} alt="Logo" className='img__header' />
            </div>
            {
                cart ?
                    
                        cart?.map(product => (
                            <div className='cart__product'>
                                <h2>{product?.title}</h2>
                            </div>

                        ))
                    :
                    <div className='cart__empty'>
                        <img src={Empty} alt="cart empty" />
                        <h4>My Cart is Empty</h4>
                    </div>
            }
        </div>
    )
}

export default Cart
