import React, { useState } from 'react'
import './ProductCard.css'
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from 'react-icons/lib';

const ProductCard = ({ product }) => {

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
    return (
        <div className='ProductCard'>
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
                    <button className='cart__button'>
                        <GiShoppingBag />
                    </button>
                </IconContext.Provider>


            </div>
        </div>
    )
}

export default ProductCard
