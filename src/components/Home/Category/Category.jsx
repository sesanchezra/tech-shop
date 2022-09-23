import React, { useEffect, useState } from 'react'
import './Category.css'

const Category = ({category,setCategoryActive,categoryActive}) => {

    const [active, setActive] = useState(false)

    const setCategory = () =>{
        setCategoryActive(category.name)
    }


    useEffect(() => {
        if(categoryActive===category.name){
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [categoryActive])

    return (
        <button className={`Category-${active}`} onClick={setCategory}>
            {category.name}
        </button>
    )
}

export default Category
