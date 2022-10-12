import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import '../Home/Home.css'
import { getProducts } from '../../store/slices/products.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Favorite from './Favorite/Favorite'
import { AiFillHeart, AiOutlineHeart, AiFillHome, AiOutlineHome ,AiOutlineUser} from "react-icons/ai";
import { RiShoppingBagFill, RiShoppingBagLine , RiSearchFill,RiSearchLine} from "react-icons/ri";
import Cart from './Cart/Cart'
import { IconContext } from 'react-icons/lib'
import HomePage from './HomePage/HomePage'
import Orders from './Orders/Orders'


const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const [homeActive, sethomeActive] = useState(true)
    const [favorite, setFavorite] = useState(false)
    const [cart, setCart] = useState(false)
    const [orders, setOrders] = useState(false)

    const navigate = useNavigate()

    const homeToggle = () => {
        sethomeActive(true)
        setFavorite(false)
        setCart(false)
        setOrders(false)
    }
    
    

    const favoriteToggle = () => {
        sethomeActive(false)
        setFavorite(true)
        setCart(false)
        setOrders(false)
    }
    const cartToggle = () => {
        sethomeActive(false)
        setFavorite(false)
        setCart(true)
        setOrders(false)
    }
    
    const [profileShow, setProfileShow] = useState(false)

    const showProfile = () => {
        setProfileShow(true)
        sethomeActive(true)
        setFavorite(false)
        setCart(false)
        setOrders(false)
    }

    const hideProfile =() =>{
        setProfileShow(false)
    }

    const orderToggle = () =>{
        sethomeActive(false)
        setFavorite(false)
        setCart(false)
        setOrders(true)
    }
    // console.log('-------------------')
    // console.log('profile',profileShow)
    // console.log('cart',cart)
    // console.log('Home',homeActive)
    // console.log('Favorite',favorite)


    return (
        <div className='Home'>
            {
                !profileShow &&
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
                        <button 
                        className='menu__button' 
                        onClick={
                            profileShow ?
                                hideProfile
                            :
                                showProfile
                        }
                        >
                            
                                
                                    <AiOutlineUser />

                            
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

            }
            
            {
                homeActive ?
                    <HomePage
                        cartToggle={cartToggle}
                        homeToggle={homeToggle}
                        favoriteToggle={favoriteToggle}
                        cartToggle={cartToggle}
                        showProfile={showProfile}
                        hideProfile={hideProfile}
                        profileShow={profileShow}
                        orderToggle={orderToggle}
                    />
                    :
                    favorite ?
                        <Favorite
                            homeToggle={homeToggle}
                        />
                        :
                        cart ? 
                        <Cart
                        homeToggle={homeToggle}
                        />
                        :
                            orders &&
                                <Orders
                                    homeToggle={homeToggle}
                                />
                        

            }
        </div>
    )
}

export default Home
