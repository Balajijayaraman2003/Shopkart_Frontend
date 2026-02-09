import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailsCard from '../components/Products/ProductDetailsCard'

function ProductDetails() {
    let { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/app/products/${id}`)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])
    return (
        <div className='main-container'>
            <ProductDetailsCard data={product} />
        </div>
    )
}

export default ProductDetails