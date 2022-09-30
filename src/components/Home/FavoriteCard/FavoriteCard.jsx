import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { IconContext } from 'react-icons/lib'
import '../FavoriteCard/FavoriteCard.css'

const FavoriteCard = ({ favorite ,setFavorites,favorites}) => {

    
    const [likeClicked, setlikeClicked] = useState(false)
    

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem('favorites')))
    }, [likeClicked])


    const updateFavorites = (id) => {
        let filterFavorites=favorites?.filter(favorite => {
            if(favorite?.id != id){
                return true
            }
        })

        localStorage.setItem('favorites',JSON.stringify(filterFavorites))
        setlikeClicked(!likeClicked)
    }


    return (
        <div className='favoriteCard'>
            <IconContext.Provider value={{ size: '1.2em', color: `red` }}>
                <button className='like__button' onClick={()=>updateFavorites(favorite?.id)}>
                    <AiFillHeart />
                </button>
            </IconContext.Provider>
            <div className='favoriteCard__slider'>
                {
                    favorite?.productImgs.map(image => (
                        <img src={image} alt="product image" className='item__slider' />
                    ))
                }
            </div>
            <div className='favoriteCard__description'>
                <h6>{favorite?.title}</h6>
                <p>{`$ ${favorite?.price}`}</p>
            </div>
        </div>
    )
}

export default FavoriteCard
