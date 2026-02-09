import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Logout from '../pages/Logout'
import ProductList from '../pages/ProductList'
import ProductDetails from '../pages/ProductDetails'
import OrderProducts from '../pages/OrderProducts'
import PaymentSuccess from '../pages/PaymentSuccess'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUserData } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import Address from '../pages/Address'
import CardCheckout from '../components/Payments/CardCheckout'
import PaymentFailure from '../pages/PaymentFailure'
import OrdersList from '../pages/OrdersList'
import OrderDetailCard from '../components/Orders/OrderDetailCard'
import Category from '../pages/Category'
import CetegoriesViews from '../pages/CetegoriesViews'
import Cart from '../pages/Cart'

function Routingcomp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let token = localStorage.getItem("access_token")
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch(addUserData(response.data))
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }, [])
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/signout' element={<Logout />} />
      <Route path='/register' element={<Register />} />
      <Route path="/address" element={<Address />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/product-detail/:id' element={<ProductDetails />} />
      <Route path="/products/order" element={<OrderProducts />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failure" element={<PaymentFailure />} />
      <Route path="/payment" element={<CardCheckout/> } />
      <Route path="/orders" element={<OrdersList/>} />
      <Route path="/order-details/:id" element={<OrderDetailCard/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/categories" element={<CetegoriesViews />} />
      <Route path="/cart" element={<Cart/>} />


    </Routes>
  )
}

export default Routingcomp