import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'
import './Orders.css'
import TechLogo from '../../../assets/TechLogo-Grey.png'
import axios from 'axios'
import OrderCard from './OrderCard'

const Orders = ({ homeToggle }) => {

    //Get purchases
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(URL, config)
            .then(res => setPurchases(res.data.data.purchases))
            .catch(error => console.log(error))
    }, [])

    console.log(purchases)
    return (
        <div className='Orders'>
            <div className='Orders__header'>
                <IconContext.Provider value={{ size: '1.6em', color: 'rgb(19, 19, 19)' }}>
                    <button className='header__button' onClick={homeToggle}>
                        <BiArrowBack />
                    </button>
                </IconContext.Provider>
                <img src={TechLogo} alt="Logo" className='img__header' />
            </div>
            <div className='Orders__resume'>
                {
                    purchases?.map((purchase, index) => (
                        <OrderCard
                            key={index}
                            purchase={purchase}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Orders
