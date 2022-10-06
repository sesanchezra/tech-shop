import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import Empty from '../../../assets/Cart.png'
import '../Cart/Cart.css'
import { BiArrowBack } from "react-icons/bi";
import TechLogo from '../../../assets/TechLogo-Grey.png'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Cart = ({ homeToggle }) => {

    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])

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


        const URL2 = `https://ecommerce-api-react.herokuapp.com/api/v1/products`

        axios.get(URL2, config)
            .then(res => setProducts(res.data.data.products))
            .catch(error => console.log(error))
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
    console.log(products)

    //Quantity function

    const [quantity, setQuantity] = useState(1)

    const plus = () => {
        setQuantity(quantity + 1)
    }
    const minus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }

    }

    //Images array

    // const [config, setConfig] = useState({
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    // })

    // useEffect(() => {
    //     cart?.map(product => {

    //     }

    //     )
    // }, [cart])

    // const getImage = (id) =>{
    //     axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/1`,config)
    //         .then()
    // }




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
                    <div className='cart__products__section'>
                        {
                            cart?.map(product => (
                                <div className='cart__product' key={product?.title}>
                                    <div className='cart__product__description'>

                                        <h3>{product?.title}</h3>
                                        <span>{`$ ${product?.price}`}</span>


                                        <div className='cart__product__quantity'>
                                            <IconContext.Provider value={{ color: "white", className: "icon", size: '1em' }}>
                                                <button className='cart__product__quantity__button__left' onClick={plus}>
                                                    <AiOutlinePlus />
                                                </button>
                                            </IconContext.Provider>

                                            <div className='cart__product__quantity__label'>{quantity}</div>

                                            <IconContext.Provider value={{ color: "white", className: "icon", size: '1em' }}>
                                                <button className='cart__product__quantity__button__right' onClick={minus}>
                                                    <AiOutlineMinus />
                                                </button>
                                            </IconContext.Provider>

                                        </div>

                                    </div>
                                    <div className='cart__product__image'>
                                        {
                                            products?.map(prod => (
                                                prod?.id === product?.id &&
                                                <img src={prod?.productImgs[0]} alt="image" className='item__image' />
                                            ))
                                        }
                                    </div>

                                </div>

                            ))
                        }
                    </div>

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
