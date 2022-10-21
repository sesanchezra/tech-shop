import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import TechLogo from '../../../assets/TechLogo-Grey.png'
import '../Favorite/Favorite.css'
import FavoriteCard from '../FavoriteCard/FavoriteCard';
import FavoriteError from '../../../assets/favorite.png'

const Favorite = ({homeToggle}) => {

    const navigate = useNavigate()

    const [favorites, setFavorites] = useState()

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem('favorites')))
    }, [])

    

    return (
        <div className='Favorite'>
            <div className='Favorite__header'>
                <IconContext.Provider value={{ size: '1.6em', color: 'rgb(19, 19, 19)' }}>
                    <button className='header__button' onClick={homeToggle}>
                        <BiArrowBack />
                    </button>
                </IconContext.Provider>
                <img src={TechLogo} alt="Logo" className='img__header' />
            </div>

            <div className='favorites'>
                {
                    favorites?.length>0 ?
                    favorites?.map(favorite => (
                        <FavoriteCard
                            favorite={favorite}
                            key={favorite?.title}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    ))
                    :
                        <div className='favorite__empty'>
                            <img src={FavoriteError} alt="favorite" />
                            <h2>It's empty</h2>
                        </div>
                }
            </div>
        </div>
    )
}

export default Favorite
