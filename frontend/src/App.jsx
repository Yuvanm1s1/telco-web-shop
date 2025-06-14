
// App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cartpage from "./pages/Cartpage";
import { createContext } from 'react';
import { getItem, setItem } from './utils/localStorage';
import CheckOut from './pages/CheckOut';
export const CartContext=createContext();
function App() {
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems,setCartItems]=useState(
    ()=>{
      const item=getItem("cart_elements");
      return item || [];
    }
  );
  useEffect(()=>{
    setItem("cart_elements",cartItems)
  },[cartItems])

  
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
    alert("All items have been removed from your cart.");
  }

  return (
    <>
    <CartContext.Provider value={{
      cartItems,addToCart,clearCart
    }}>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cartpage/>} />
      <Route path="/checkout" element={<CheckOut/>}/>
    </Routes>
    </CartContext.Provider>
    </>
  );
}

export default App;
