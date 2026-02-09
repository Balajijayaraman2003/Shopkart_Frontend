import React from 'react'
import { useLocation } from 'react-router-dom'

function PaymentFailure() {
  const {error} = useLocation().state
  console.log(error)
  const {payment_intent,payment_method} = error
  const {card} = payment_method
  
  return (
    <div className='main-container'>
      <p>Amount : {payment_intent.amount/100}</p>
      <p>Currency : {payment_intent.currency.toUpperCase()}</p>
      <p>Card : *** *** *** {card.last4}</p>
      <p>Payment Status : Failed</p>
      <p>Payment Id : {payment_intent.id}</p>
      <p>Reson : <span className='text-danger'>{error.code.toUpperCase() ||error.message || error.decline_code }</span></p>
      </div>
  )
}

export default PaymentFailure