import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import CardCheckout from '../components/Payments/CardCheckout'
import { Button } from 'react-bootstrap'

function OrderProducts() {
  const { product, quantity } = useLocation().state
  const [productData, setProductData] = useState({})
  const [error,setError] = useState(null)
  useEffect(() => {
    if (!product) return;
    const token = localStorage.getItem("access_token")

    axios.post("http://127.0.0.1:8000/order/orders/", { products: [{ product_id: product.id, quantity: quantity }] }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setProductData(response.data)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
  }, [product])
  
  return (
    <div className='main-container'>
      {
       !error ? <CardCheckout order_data={productData} /> 
       : <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='display-5 p-3 text-center'>{error.response.data.error}</h1>
        <Link to={"/address"}><Button>Add Address</Button></Link>
       </div>
      }      
    </div>
  )
}

export default OrderProducts