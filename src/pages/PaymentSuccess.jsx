import React, {useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

function PaymentSuccess() {
  const token = localStorage.getItem("access_token")
  const [searchParams] = useSearchParams()
  const [orderData, setOrderData] = useState(null)
  const [paymentData, setPaymentData] = useState(null)
  const order_id_ = searchParams.get("order_id")
  const location = useLocation()
  const {order_id} = location.state || {}
  useEffect(() => {
    if (!order_id) return;
    axios.get(`http://127.0.0.1:8000/order/order-details/${order_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        const response_data = response.data
        if (response_data) {
          setOrderData(response_data)
          setPaymentData(response_data.payment_details)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [order_id])
  console.log(paymentData)


  return (
    <div style={{width:"100%",height:"100%"}} className='main-container'>
      {
        orderData && paymentData ?
          <div className='d-flex flex-column justify-content-center m-2'>
            <p className='fs-5'> <span className='fw-bold'>Order Id :</span> <span>{order_id}</span></p>
            <p className='fs-5'> <span className='fw-bold'>Order Status:</span> {orderData.status}</p>
            <p className='fs-5'> <span className="fw-bold">Payment Id :</span> {paymentData.payment_id}</p>
            <p className='fs-5'> <span className="fw-bold">Amount :</span> {paymentData.amount}</p>
            <p className='fs-5'> <span className="fw-bold">payment Method :</span> {paymentData.payment_method}</p>
            <p className='fs-5'> <span className="fw-bold">Payment Status :</span> <span className="text-success">{paymentData.status}</span></p>
            <p className='fs-5'> <span className='fw-bold'>Date & Time :</span> {paymentData.updated_at}</p>
            <Link to={`/order-details/${order_id}`} className='fs-5 btn btn-primary'>Track Order</Link>
          </div> : <p>Loading...</p>

      }

    </div>
  )
}
export default PaymentSuccess