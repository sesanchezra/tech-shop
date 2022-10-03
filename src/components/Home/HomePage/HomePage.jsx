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
import { BiArrowBack } from "react-icons/bi";
import NotFound from '../../../assets/NotFound.png'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../store/slices/products.slice'
import Error from '../../../assets/Error.png'

const defaultValue = {
    search: ''
}


const HomePage = ({ cartToggle }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [categories, setCategories] = useState()

    useEffect(() => {
        const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
        axios.get(URL)
            .then(res => setCategories(res.data.data.categories))
            .catch(error => console.log(error))
    }, [])

    const [allClick, setAllClick] = useState(false)
    const [categoryActive, setCategoryActive] = useState('All')
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
        setCategoryActive('All')
    }, [allClick])


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

        //Esto me permite quitar duplicados
        let filter = new Set(searchResult);
        let result = [...filter] //Esta línea de código filtra
        setSearchResult(result)
        reset(defaultValue)
    }


    //Filter functionality


    const [filterProducts, setFilterProducts] = useState()
    useEffect(() => {

        let arrayFilter = products?.filter(product => {
            if (categoryActive != 'All') {
                if (product.category.name.toLowerCase() === categoryActive.toLowerCase()) {
                    return true
                }
            }
            else if (categoryActive === 'All') {
                return true
            }
        })

        setFilterProducts(arrayFilter)
    }, [categoryActive])

    const back = () => {
        setAllClick(true)
        setSearchActive('')
    }

    //Error adding to cart

    const [errorToAddCart, setErrorToAddCart] = useState(false)

    const showError = () => {
        setErrorToAddCart(true)
        setTimeout(() => {
            setErrorToAddCart(false)
        }, 1500);
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
                            <IconContext.Provider value={{ size: '1.6em', color: 'rgb(35, 38, 45,0.6)' }}>
                                <button className='back' onClick={back}>
                                    <BiArrowBack />
                                </button>
                            </IconContext.Provider>
                        </>
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
                    errorToAddCart &&
                    <div className='error__adding__cart'>
                        <div className='content'>
                            <img src={Error} alt='error' />
                            <h5>You already added this product to the cart</h5>
                        </div>
                    </div>
                }
                {
                    searchActive ?

                        (searchResult.length > 0) ?
                            searchResult?.map(product => (
                                <ProductCard
                                    key={product.title}
                                    product={product}
                                    cartToggle={cartToggle}
                                    showError={showError}
                                />
                            ))
                            :
                            <div className='error__notFound'>
                                <img src={NotFound} alt="ERROR" />
                                <h4>Not Matches Found</h4>
                            </div>

                        :
                        categoryActive === 'All' ?
                            products?.map(product => (
                                <ProductCard
                                    key={product.title}
                                    product={product}
                                    cartToggle={cartToggle}
                                    showError={showError}
                                />
                            ))
                            :
                            filterProducts?.map(product => (
                                <ProductCard
                                    key={product.title}
                                    product={product}
                                    cartToggle={cartToggle}
                                    showError={showError}
                                />
                            ))
                }
            </div>
        </div>
    )
}

export default HomePage
