import React, { useState } from 'react'
import './ProductCard.css'
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getCart} from '../../../store/slices/cart.slice'
import { useDispatch } from 'react-redux';


const ProductCard = ({ product, cartToggle , showError,showErrorApi}) => {

    const [positionScroll, setPositionScroll] = useState('start')

    const handleScroll = event =>{
        
        
        if(event.currentTarget.scrollLeft<=(window.screen.width/0.5421681) && event.currentTarget.scrollLeft>=(window.screen.width/0.6626499)){
            setPositionScroll('end')
        }
        else if (event.currentTarget.scrollLeft<=(window.screen.width/1.086327) && event.currentTarget.scrollLeft>=(window.screen.width/1.3240733)){
            setPositionScroll('middle')
        }
        else if(event.currentTarget.scrollLeft===0){
            setPositionScroll('start')
        }
    }

    const dispatch = useDispatch()
    const getCartUser = () => dispatch(getCart())

    

    //Add to Cart Function

    const addToCart =()=>{
        const  URL ='https://ecommerce-api-react.herokuapp.com/api/v1/cart'

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const productToAdd = {
            "id": product?.id,
            "quantity": 1
        }

        axios.post(URL,productToAdd, config )
            .then(res => {
                console.log(res.data)
                cartToggle()
                getCartUser()
            })
            .catch (error => {
                console.log(error)
                if(error.response.data.message === "Email is already taken"){
                    showErrorApi()
                }
                else if(error.response.data.message === "You already added this product to the cart") {
                    showError()
                }
                
            })
    }

    //Show error to add cart

    


    //Go to details

    const [detailsOver, setDetailsOver] = useState(false)

    const navigate=useNavigate()
    // console.log(product)
    const goToDetails=()=>{
        navigate(`/productdetail/${product.id}`)
    }

    const [hoverSee, setHoverSee] = useState(false)

    return (
        <div className='ProductCard' onMouseOver={()=> setDetailsOver(true)} onMouseOut={()=> setDetailsOver(false)}>
            {
                detailsOver &&
                    <div className='seeMore' >
                        <button onClick={goToDetails} className={`more__button`} onMouseOver={()=> setHoverSee(true)} onMouseOut={()=> setHoverSee(false)}>
                            See More
                        </button>
                    </div>
            }
            <div className='images' onScroll={handleScroll}>
                {
                    product.productImgs.map((image,index) => (
                        <img src={image} alt={image} className='images__item' key={index}/>
                    ))
                }
            </div>
            <div className=''>

            </div>
            <div className='index__points'>
                <div className={positionScroll=== 'start' ? 'active' : 'inactive'}></div>
                <div className={positionScroll=== 'middle' ? 'active' : 'inactive'}></div>
                <div className={positionScroll=== 'end' ? 'active' : 'inactive'}></div>
            </div>
            <div className='footer'>
                <div className='description'>
                    <h3>{product.title}</h3>
                    <h5>{product.category.name}</h5>
                </div>
                <IconContext.Provider value={{ size: '1.7em', color: 'white' }}>
                    <button className='cart__button' onClick={addToCart}>
                        <GiShoppingBag />
                    </button>
                </IconContext.Provider>


            </div>
        </div>
        
    )
}

export default ProductCard
