import React from 'react'
import { useDispatch } from 'react-redux'
function About() {
    let dispatch = useDispatch()
    return (
        <div className='main-container'>
            <p className='h3'>🛍️ About ShopKart</p>
            <p> Welcome to ShopKart, your one-stop destination for everything you love—from fashion and electronics to home essentials and lifestyle upgrades. We believe shopping should be simple, secure, and satisfying. That’s why we’ve built a platform that puts you first.</p>
            <p className='h3'>🌟 Our Mission</p>
            <p>To empower every customer with a seamless online shopping experience that blends convenience, quality, and affordability.</p>
            <p className="h3">🚀 What We Offer</p>
            <p>- Curated Collections: Handpicked products from trusted brands and local artisans.</p>
            <p>- Secure Payments: Powered by Stripe, including UPI, cards, and wallets for smooth checkout.</p>
            <p>- Fast Delivery: Reliable shipping across India with real-time tracking.</p>
            <p>- Responsive Support: Friendly help whenever you need it—before, during, or after your purchase.</p>
            <p className="h3">💡 Why Shop With Us?</p>
            <p>We’re not just another eCommerce site. We’re a team of passionate creators, developers, and dreamers who care about making your online shopping journey better every day. Whether you're upgrading your wardrobe or gifting a loved one, ShopKart is here to make it memorable.</p>
        </div>
    )
}

export default About