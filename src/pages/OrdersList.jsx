
import React, { useEffect, useState } from 'react'
import OrderCard from '../components/Orders/OrderCard'
import axios from 'axios'
import { Container } from 'react-bootstrap'

function OrdersList() {
  const [prevUrl,setPrevUrl] = useState("")
  const [nextUrl,setNextUrl] = useState("")
  const [orderData, setOrderData] = useState([])
  const token = localStorage.getItem("access_token")
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/order/orders/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setOrderData(response.data.results)
      setNextUrl(response.data.next)
      setPrevUrl(response.data.previous)
    })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div className='main-container'>
      <Container className='w-100 h-100'>
      {
        orderData && orderData.map((item)=>{
          return <OrderCard key={item.order_id} data={item}/>
        })
      }
      {
        orderData.length <= 0 && <h1 className='display-5 text-center'>No Orders Yet!</h1>
      }
      </Container>
    </div>
  )
}

export default OrdersList