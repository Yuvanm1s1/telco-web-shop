import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function Cart({cartItems}) {
const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cart");
  };

return (
    <div className='bg-white shadow-md rounded-lg hover:shadow-lime-700'>
        <button
            className="bg-green-200 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleClick}
        >
            <div className="flex text-green-500 text-2xl flex-row">
                <FaShoppingCart />
                <p>{cartItems.length}</p>
            </div>
        </button>
    </div>
)
}

export default Cart
