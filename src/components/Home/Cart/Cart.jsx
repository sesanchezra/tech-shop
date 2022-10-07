import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import Empty from '../../../assets/Cart.png'
import '../Cart/Cart.css'
import { BiArrowBack } from "react-icons/bi";
import TechLogo from '../../../assets/TechLogo-Grey.png'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { getCart, plus } from '../../../store/slices/cart.slice'
import { getProducts } from '../../../store/slices/products.slice'


const Cart = ({ homeToggle }) => {


    const cart = useSelector(state => state.cart)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const getCartUser = () => dispatch(getCart())
    const getProductsUser = () => dispatch(getProducts())

    const [cartUser, setCartUser] = useState()

    useEffect(() => {
        getCartUser()
        getProductsUser()

    }, [])

    useEffect(() => {
        if (cart.length > 0) {
            setCartUser(cart)
        }
    }, [cart])

    // Plus

    const plus = (id, quantity) => {
        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart`

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const data = {
            id: id,
            newQuantity: quantity + 1
        }

        axios.patch(URL, data, config)
            .then(res => {

                getCartUser()
            })
            .catch(error => console.log(error))
    }
    const minus = (id, quantity, title) => {
        if (quantity > 1) {
            const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart`

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            const data = {
                id: id,
                newQuantity: quantity - 1
            }

            axios.patch(URL, data, config)
                .then(res => {
                    getCartUser()
                })
                .catch(error => console.log(error))
        }
        else if (quantity === 1) {
            const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            axios.delete(URL, config)
                .then(res => {
                    getCartUser()
                })
                .catch(error => console.log(error))

        }

    }

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let suma = 0
        cart?.map(product => {
            suma += (product?.price * product?.productsInCart.quantity)

        })
        setTotal(suma)
    }, [cart])

    const purchaseCart = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const address = {
            "street": "Green St. 1456",
            "colony": "Southwest",
            "zipCode": 12345,
            "city": "USA",
            "references": "Some references"
        }
        axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, address, config)
            .then(res => {
                console.log(res.data)

                getCartUser()
            })
            .catch(error => console.log(error))
    }


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
                cart.length === 0 ?
                    <div className='cart__empty'>
                        <img src={Empty} alt="cart empty" />
                        <h4>My Cart is Empty</h4>
                    </div>
                    :
                    <div className='cart__products__section'>
                        {
                            cart?.map(product => (

                                <div className='cart__product' key={product?.title}>
                                    <div className='cart__product__description'>

                                        <h3>{product?.title}</h3>
                                        <span>{`$ ${product?.price}`}</span>


                                        <div className='cart__product__quantity'>
                                            <IconContext.Provider value={{ color: "white", className: "icon", size: '1em' }}>
                                                <button className='cart__product__quantity__button__left' onClick={() => plus(product?.id, product?.productsInCart.quantity)} >
                                                    <AiOutlinePlus />
                                                </button>
                                            </IconContext.Provider>

                                            <div className='cart__product__quantity__label'>{product?.productsInCart.quantity}</div>

                                            <IconContext.Provider value={{ color: "white", className: "icon", size: '1em' }}>
                                                <button className='cart__product__quantity__button__right' onClick={() => minus(product?.id, product?.productsInCart.quantity, product?.title)}>
                                                    <AiOutlineMinus />
                                                </button>
                                            </IconContext.Provider>

                                        </div>

                                    </div>
                                    <div className='cart__product__image'>
                                        {
                                            products?.map(prod => (
                                                prod?.id === product?.id &&
                                                <img src={prod?.productImgs[0]} alt="image" className='item__image' key={prod?.id} />
                                            ))
                                        }
                                    </div>

                                </div>

                            ))
                        }
                        {
                            <div className='cart__button__proceed'>
                                <div className='cart__price__total'>
                                    <h4>Total price</h4>
                                    <h2>{`$ ${total}`}</h2>
                                </div>
                                <button className='proceed' onClick={purchaseCart}>
                                    Proceed
                                </button>
                            </div>
                        }
                    </div>


            }
        </div>
    )
}

export default Cart
