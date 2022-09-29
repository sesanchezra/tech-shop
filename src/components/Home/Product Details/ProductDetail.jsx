import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { IconContext } from 'react-icons/lib';
import { BiArrowBack } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import './ProductDetail.css';
import TechLogo from '../../../assets/TechLogo-Grey.png'
import { setFavorites } from '../../../store/slices/favorites.slice';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState()
    const [likeColor, setLikeColor] = useState()
    const [isLike, setIsLike] = useState()
    const [likeClicked, setLikeClicked] = useState(false)

    const verifyLike = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        let filter = favorites?.filter(favorite => {
            if (favorite?.id === Number(id)) {
                return true
            }
        })
        if (filter?.length > 0) {
            setLikeColor('red')
            setIsLike(true)
        }
        else {
            setLikeColor('rgb(19,19,19)')
            setIsLike(false)
        }
    }

    useEffect(() => {
        verifyLike(id)
    }, [likeClicked])

    useEffect(() => {
        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`
        axios.get(URL)
            .then(res => {
                setProduct(res.data.data.product)
                
            })
            .catch(error => console.log(error))


    }, [])

    // console.log(product)

    const navigate = useNavigate()

    //Slider

    const [positionScroll, setPositionScroll] = useState('start')

    const handleScroll = event => {
        if (event.currentTarget.scrollLeft <= (window.screen.width / 0.5421681) && event.currentTarget.scrollLeft >= (window.screen.width / 0.6626499)) {
            setPositionScroll('end')
        }
        else if (event.currentTarget.scrollLeft <= (window.screen.width / 1.086327) && event.currentTarget.scrollLeft >= (window.screen.width / 1.3240733)) {
            setPositionScroll('middle')
        }
        else if (event.currentTarget.scrollLeft === 0) {
            setPositionScroll('start')
        }
    }

    //Add to cart

    const addToCart = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart'

        const productToAdd = {
            id: product?.id,
            quantity: 1
        }

        axios.post(URL, config, productToAdd)
            .then(res => console.log(res.data.data))
            .catch(error => console.log(error))
    }


    // Favorites function


    const addFavorites = () => {
        if (isLike === false) {
            let favorites = JSON.parse(localStorage.getItem('favorites'))
            let newFavorites = []
            if (favorites === null) {
                newFavorites.push(product)
                localStorage.setItem('favorites', JSON.stringify(newFavorites))
                dispatch(setFavorites(newFavorites))
            }
            else {

                favorites.push(product)
                let newFavoritesFilter = favorites?.filter(favorite => {
                    if (favorite?.id === product?.id) {
                        return false
                    }
                    else {
                        return true
                    }
                }
                )
                newFavoritesFilter.push(product)
                localStorage.setItem('favorites', JSON.stringify(newFavoritesFilter))
            }
            setLikeClicked(!likeClicked)
        }
        else{
            let favorites = JSON.parse(localStorage.getItem('favorites'))
            let filter = favorites?.filter( favorite => {
                if (favorite?.id === product?.id) {
                    return false
                }
                else {
                    return true
                }
            })
            localStorage.setItem('favorites', JSON.stringify(filter))
            setLikeClicked(!likeClicked)
        }



    }







    return (
        <div className='ProductDetail'>
            <div className='productDetail__header'>
                <IconContext.Provider value={{ size: '1.6em', color: 'rgb(19, 19, 19)' }}>
                    <button className='header__button' onClick={() => navigate(-1)}>
                        <BiArrowBack />
                    </button>
                </IconContext.Provider>
                <img src={TechLogo} alt="Logo" className='img__header' />

                <IconContext.Provider value={{ size: '1.8em', color: `${likeColor}` }}>
                    <button className='header__button' onClick={addFavorites}>
                        <AiFillHeart />
                    </button>
                </IconContext.Provider>
            </div>
            <div className='productDetail__info'>
                <div className='info__images' onScroll={handleScroll}>
                    {
                        product?.productImgs.map((image, index) => (
                            <img src={image} alt={image} className='images__item' key={index} />
                        ))
                    }
                </div>
                <div className='index__points'>
                    <div className={positionScroll === 'start' ? 'active' : 'inactive'}></div>
                    <div className={positionScroll === 'middle' ? 'active' : 'inactive'}></div>
                    <div className={positionScroll === 'end' ? 'active' : 'inactive'}></div>
                </div>
                <div className='product__description'>
                    <div className='product__title'>
                        <h2>{product?.title}</h2>
                        <h4>{product?.category}</h4>
                    </div>
                    <div className='product__specifications'>
                        <p>{product?.description}</p>
                    </div>
                </div>
                <div className='product__action'>
                    <div className='price'>
                        <h4>Price</h4>
                        <h2>{`$ ${product?.price}`}</h2>
                    </div>
                    <button className='button__cart' onClick={addToCart}>
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
