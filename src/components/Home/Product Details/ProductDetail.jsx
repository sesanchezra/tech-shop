import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { IconContext } from 'react-icons/lib';
import { BiArrowBack } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import './ProductDetail.css';
import TechLogo from '../../../assets/TechLogo-Grey.png'

const ProductDetail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState()

    useEffect(() => {
        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`
        axios.get(URL)
            .then(res => setProduct(res.data.data.product))
            .catch(error => console.log(error))

    }, [])

    console.log(product)

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

    return (
        <div className='ProductDetail'>
            <div className='productDetail__header'>
                <IconContext.Provider value={{ size: '1.6em', color: 'rgb(19, 19, 19)' }}>
                    <button className='header__button' onClick={() => navigate(-1)}>
                        <BiArrowBack />
                    </button>
                </IconContext.Provider>
                <img src={TechLogo} alt="Logo" className='img__header' />

                <IconContext.Provider value={{ size: '1.8em', color: 'rgb(19, 19, 19)' }}>
                    <button className='header__button'>
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
                        <button className='button__cart'>
                            Add to Bag
                        </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail