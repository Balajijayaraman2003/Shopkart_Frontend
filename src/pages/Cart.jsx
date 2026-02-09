import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartCard from '../components/Cart/CartCard';

function Cart() {
  const [products, setProducts] = useState([]);

  // Fetch cart items
  const fetchCart = () => {
    axios.get("http://127.0.0.1:8000/app/cart/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then((response) => {
      setProducts(response.data);
    })
    .catch((err) => console.error("Error fetching cart:", err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Delete item and refresh cart
  const deleteCartItem = (id) => {
    axios.delete(`http://127.0.0.1:8000/app/cart/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(() => {
      console.log("Product deleted");
      fetchCart(); // refresh cart after deletion
    })
    .catch((err) => console.error("Product unable to delete:", err));
  };

  return (
    <div>
      {products.map((item) => (
        <CartCard key={item.id} data={item} onDelete={deleteCartItem} />
      ))}
    </div>
  );
}

export default Cart;