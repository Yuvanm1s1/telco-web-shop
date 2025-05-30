import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa6";
function NavBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  return (
    <nav className="bg-white shadow-md w-full z-10 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          TELCO-WEB-SHOP
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <div className="relative">
            <button
              onClick={() => toggleDropdown('tariffs')}
              className="text-gray-700 hover:text-green-600"
            >
              Tariffs
            </button>
            {isDropdownOpen === 'tariffs' && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Prepaid</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Postpaid</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('info')}
              className="text-gray-700 hover:text-green-600"
            >
              Info
            </button>
            {isDropdownOpen === 'info' && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">eSIM</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Shipping</Link>
              </div>
            )}
          </div>
          <div className='relative'>
            <button onClick={()=>toggleDropdown("Help & Service")} className="text-gray-700 hover:text-green-600">
                Help & Service
            </button>
            {isDropdownOpen === 'Help & Service' && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">FAQ & Contact</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Service Overview</Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleDropdown('Counselor')}
              className="text-gray-700 hover:text-green-600"
            >
              Counselor
            </button>
            {isDropdownOpen === 'Counselor' && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Guide Overview</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Parents Guide</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Children Guide</Link>
              </div>
            )}
          </div>
        </div>

        
        <div className="hidden md:flex space-x-4">
          <button className="bg-green-200 text-white px-4 py-2 rounded hover:bg-green-700">
            <div className="text-green-500 text-2xl">
                <FaShoppingCart />
            </div>
          </button>
          <button className="bg-green-200 text-white px-4 py-2 rounded hover:bg-green-700">
            <div className="text-green-500 text-2xl">
                <FaRegUser />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
