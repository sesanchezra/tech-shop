import React, { useEffect, useState } from 'react'
import Emoji from '../../../assets/Emoji.png'
import './HomePage.css'
import { IoMdNotifications } from "react-icons/io";
import { IconContext } from 'react-icons/lib';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import Category from '../Category/Category';
import ProductCard from '../ProductCard/ProductCard';
import { useForm } from 'react-hook-form';

const defaultValue = {
    search: ''
}


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
    const [allClick, setallClick] = useState(false)

    useEffect(() => {
        const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/products'
        axios.get(URL)
            .then(res => setProducts(res.data.data.products))
            .catch(error => console.log(error))
    }, [allClick])



    const [categoryActive, setCategoryActive] = useState('All')


    //Search Functionality

    const { handleSubmit, register, reset } = useForm()

    const [searchActive, setSearchActive] = useState(false)

    const [searchResult, setSearchResult] = useState()

    const search = (data) => {
        setSearchActive(true)
        const arraySearch = data.search?.toLowerCase().split(' ')

        let searchResult = products?.filter(product => {
            let arrayTitle = product.title.toLowerCase().split(' ')
            for (let i = 0; i < arraySearch.length; i++) {
                for (let j = 0; j < arrayTitle.length; j++) {
                    if (arraySearch[i] === arrayTitle[j]) {
                        return true
                    }

                }
            }

        })

        let filter = new Set(searchResult);
        let result = [...filter]
        setSearchResult(result)
        reset(defaultValue)
    }

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

            <form className='search' onSubmit={handleSubmit(search)}>

                <input type="text" placeholder='Search' {...register('search')} />
                <IconContext.Provider value={{ size: '1.8em', color: 'rgb(35, 38, 45,0.6)' }}>
                    <button className='search__button'>
                        <FiSearch />
                    </button>

                </IconContext.Provider>

            </form>

            <div className='categories'>
                {
                    searchActive ?
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
                    :
                        <>
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
                        </>

                }

            </div>

            <div className='products'>

                {
                    searchActive ?
                        searchResult?.map(product => (
                            <ProductCard
                                key={product.title}
                                product={product}
                            />
                        ))
                        :
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
