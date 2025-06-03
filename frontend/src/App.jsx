// import NavBar from "./components/NavBar"
// import ImageSlideshow from "./components/ImageSlideShow"
// import FAQ from "./components/FAQ"
// import React, { useState } from 'react';
// import { Navigate, Route, Routes } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Services from "./components/Services";
// import Cartpage from "./pages/Cartpage";

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//     const addToCart = (service) => {
//       const exists = cartItems.find(item => item.name === service.name);
//         if (exists) {
//     // Remove service if it exists
//     setCartItems(cartItems.filter(item => item.name !== service.name));
//   } else {
//     // Add service if it doesn't exist
//     setCartItems([...cartItems, service]);
//   }     
//   console.log(cartItems);
//         // alert(`${service.name} has been added to your cart!`);
//     }
//   return (
//     <>
//     <div className="overflow-x-hidden">
//       <NavBar cartItems={cartItems}/>
//       <ImageSlideshow />
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Welcome to the TELCO-WEB-SHOP</h1>
//         <p className="text-gray-700">Explore our mobile tariffs and services.</p>
//       </div>
//       <Services addToCart={addToCart} cartItems={cartItems}/>
//       <footer className="bg-gray-700 py-4 mt-8">
//         <div className="container mx-auto text-center">
//           <FAQ/>
//         </div>
//       </footer>
//     </div>
//     </>
//   )
// }

// export default App



// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cartpage from "./pages/Cartpage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (service) => {
    const exists = cartItems.find(item => item.name === service.name);
    if (exists) {
      setCartItems(cartItems.filter(item => item.name !== service.name));
    } else {
      setCartItems([...cartItems, service]);
    }
  };
  const clearCart=()=>{
    setCartItems([]);
    alert("All items have been removed from your cart.");
  }

  return (
    <Routes>
      <Route path="/" element={<Home cartItems={cartItems} addToCart={addToCart} />} />
      <Route path="/cart" element={<Cartpage cartItems={cartItems} clearCart={clearCart}/>} />
    </Routes>
  );
}

export default App;
