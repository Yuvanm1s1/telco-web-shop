// pages/Home.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import ImageSlideshow from '../components/ImageSlideShow';
import FAQ from '../components/FAQ';
import Services from '../components/Services';
import FirstImage from '../assets/image.png';
function Home({ cartItems, addToCart }) {
  return (
    <div className="overflow-x-hidden">
      <NavBar cartItems={cartItems} />
      <ImageSlideshow />
      <div className="container mx-auto p-2 m-4 bg-green-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to the TELCO-WEB-SHOP</h1>
        <p className="text-gray-700">Explore our mobile tariffs and services.</p>
      </div>
      <Services addToCart={addToCart} cartItems={cartItems} />
      <div className="w-full hover:shadow-lg p-4 bg-green-300">
                <img src={FirstImage} alt="First" className="w-full h-full object-cover"/>
      </div>
      <footer className="bg-gray-700 py-4 mt-8">
        <div className="container mx-auto text-center">
          <FAQ />
        </div>
      </footer>
    </div>
  );
}

export default Home;
