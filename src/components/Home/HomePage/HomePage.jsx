import React, { useEffect, useState } from 'react'
import Emoji from '../../../assets/Emoji.png'
import './HomePage.css'
import { IoMdNotifications } from "react-icons/io";
import { IconContext } from 'react-icons/lib';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import Category from '../Category/Category';
import ProductCard from '../ProductCard/ProductCard';


const HomePage = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [categories, setCategories] = useState()

    useEffect(() => {
        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
        axios.get(URL)
            .then(res => setCategories(res.data.data.categories))
            .catch(error => console.log(error))
    }, [])

    const [products, setProducts] = useState()

    useEffect(() => {
        const URL ='https://ecommerce-api-react.herokuapp.com/api/v1/products'
        axios.get(URL)
            .then(res => setProducts(res.data.data.products))
            .catch(error => console.log(error))
    }, [])

    console.log(products)

    const [categoryActive, setCategoryActive] = useState('All')


    return (
        <div className='HomePage'>
            <div className='homePage__header'>
                <div className='user'>
                    <div className='img__user'>
                        <img src={Emoji} alt="avatar" />
                    </div>
                    <div className='info__user'>
                        <span>Welcome</span>
                        <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
                    </div>
                </div>

                <div className='notifications'>
                    <IconContext.Provider value={{ size: '2.2em', color: 'rgb(180, 181, 183)' }}>
                        <button className='notifications__button'>
                            <IoMdNotifications />
                        </button>

                    </IconContext.Provider>
                </div>
            </div>

            <form className='search'>

                <input type="text" placeholder='Search' />
                <IconContext.Provider value={{ size: '1.8em', color: 'rgb(35, 38, 45,0.6)' }}>
                    <button className='search__button'>
                        <FiSearch />
                    </button>

                </IconContext.Provider>

            </form>

            <div className='categories'>
                <Category
                    key={'all'}
                    category={
                        {
                            "id": 0,
                            "name": 'All',
                            "status": "active"
                        }
                    }
                    setCategoryActive={setCategoryActive}
                    categoryActive={categoryActive}
                />
                {
                    categories?.map(category => (
                        <Category
                            key={category.id}
                            category={category}
                            setCategoryActive={setCategoryActive}
                            categoryActive={categoryActive}
                        />
                    ))
                }

            </div>

            <div className='products'>
                {
                    products?.map(product => (
                        <ProductCard 
                            key={product.title}
                            product={product}                        
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage
