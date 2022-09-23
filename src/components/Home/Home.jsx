import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import '../Home/Home.css'
import { getProducts } from '../../store/slices/products.slice'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import Favorite from './Favorite/Favorite'
import { AiFillHeart, AiOutlineHeart, AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiShoppingBagFill, RiShoppingBagLine , RiSearchFill,RiSearchLine} from "react-icons/ri";
import Cart from './Cart/Cart'
import { IconContext } from 'react-icons/lib'
import HomePage from './HomePage/HomePage'

const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const [homeActive, sethomeActive] = useState(true)
    const [favorite, setFavorite] = useState(false)
    const [cart, setCart] = useState(false)

    const navigate = useNavigate()

    const homeToggle = () => {
        sethomeActive(true)
        setFavorite(false)
        setCart(false)
        
    }
    
    

    const favoriteToggle = () => {
        sethomeActive(false)
        setFavorite(true)
        setCart(false)
        
    }
    const cartToggle = () => {
        sethomeActive(false)
        setFavorite(false)
        setCart(true)
        
    }


    return (
        <div className='Home'>
            <div className='menu'>
                <div className='menu__home'>
                    <IconContext.Provider value={{ size: '2em', className: 'menu__home__button', color: 'white' }}>
                        <button className='menu__button' onClick={homeToggle}>
                            {
                                homeActive ?
                                    <AiFillHome />
                                    :
                                    <AiOutlineHome />

                            }
                        </button>

                    </IconContext.Provider>

                </div>
                <div className='menu__favorite'>
                    <IconContext.Provider value={{ size: '2em', className: 'menu__favorite__button', color: 'white' }}>
                        <button className='menu__button' onClick={favoriteToggle}>
                            {
                                favorite ?
                                    <AiFillHeart />
                                    :
                                    <AiOutlineHeart />

                            }
                        </button>
                    </IconContext.Provider>
                </div>
                <div className='menu__cart'>
                    <IconContext.Provider value={{ size: '2em', className: 'menu__cart__button', color: 'white' }}>
                        <button className='menu__button' onClick={cartToggle}>
                            {
                                cart ?
                                    <RiShoppingBagFill />
                                    :
                                    <RiShoppingBagLine />

                            }
                        </button>
                    </IconContext.Provider>
                </div>
            </div>
            {
                homeActive ?
                    <HomePage />
                    :
                    favorite ?
                        <Favorite />
                        :
                        cart && <Cart />
                        

            }
        </div>
    )
}

export default Home
