
// App.jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { SignIn, SignUp } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cartpage from "./pages/Cartpage";
import { createContext } from 'react';
import { getItem, setItem } from './utils/localStorage';
import CheckOut from './pages/CheckOut';
export const CartContext=createContext();
const stripePromise = loadStripe('pk_test_51RgJyPPfkiKYXjnU0ISrCiJsDJOQHkgN7i3Fi0Z6XPwooYVwWWmy6p8vYXdoTnCQ3433uIiHFr9vgoH2r9l1hHKH00B40DQrU6'); // your publishable key
import PrivateRoute from "./PrivateRoute";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
function App() {
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems,setCartItems]=useState(
    ()=>{
      const item=getItem("cart_elements");
      return item || [];
    }
  );
  const [quoteId, setQuoteId] = useState(() => getItem("quote_id"));

  // useEffect(()=>{
  //   setItem("cart_elements",cartItems)
  // },[cartItems])


  useEffect(() => {
  setItem("cart_elements", cartItems);

  const total = cartItems.reduce((acc, item) => acc + item.lockedPrice, 0);

  // If cart is empty, clear quoteId and remove from storage
  if (cartItems.length === 0) {
    setQuoteId(null);
    setItem("quote_id", null);
    return;
  }

  // If no quoteId, create a new quote in backend
  if (!quoteId) {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems, total })
    })
      .then(res => res.json())
      .then(data => {
        setQuoteId(data._id);
        setItem("quote_id", data._id);
      });
  } else {
    // If quoteId exists, update the quote in backend
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quotes/${quoteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems, total })
    });
  }
}, [cartItems]);

  
  const addToCart = (service) => {
    const exists = cartItems.find(item => item.name === service.name);
    if (exists) {
      setCartItems(cartItems.filter(item => item.name !== service.name));
    } else {
      setCartItems([...cartItems, {
      name: service.name,
      lockedPrice: service.price,
      qty: service.qty,
      description: service.description,
      duration: service.duration,
      simCardFee: service.simCardFee,
      features: service.features
    }]);
    }
  };
  const clearCart=()=>{ 
    setCartItems([]);
    setQuoteId(null);
    setItem("quote_id", null);
    alert("All items have been removed from your cart.");
  }

  return (
    <Elements stripe={stripePromise}>
    <CartContext.Provider value={{
      cartItems,addToCart,clearCart,quoteId
    }}>
    <Routes>
      {/* <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} /> */}
      <Route path="/sign-up/*" element={<Signup/>} />
      {/* <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} /> */}
      <Route path="/sign-in/*" element={<Signin/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cartpage/>} />
      <Route path="/checkout" element={
        <PrivateRoute>
        <CheckOut/>
        </PrivateRoute>}/>
    </Routes>
    </CartContext.Provider>
    </Elements>
  );
}

export default App;
