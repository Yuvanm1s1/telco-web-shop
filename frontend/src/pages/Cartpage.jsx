import React, { useContext } from 'react';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';
function Cartpage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.lockedPrice, 0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };
  return (
    <div className="p-8 bg-[#00796B]">
      <h1 className="text-2xl font-bold mb-6 text-white">Your Quote Summary</h1>

      {cartItems.length === 0 ? (
        <p className="text-black font-semibold">No items in your cart.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              <div key={index} className="p-6 border rounded shadow bg-white">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">{item.name}</h2>
                <p className="text-gray-700 italic mb-2">{item.description}</p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Duration:</strong> {item.duration}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-800 mb-2">
                  {item.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <p className="text-lg font-bold">
                  Locked Price: €{item.lockedPrice.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={clearCart}
              className="bg-red-700 text-white px-6 py-3 rounded hover:bg-red-600 font-semibold"
            >
              Remove all from cart
            </button>
            <div className='flex flex-col'>
            <h2 className="text-xl font-bold">
              Total Quote: €{total.toFixed(2)}
            </h2>
            <button onClick={handleClick} className="bg-[#4ba056] text-white px-6 py-3 rounded hover:bg-yellow-500 font-semibold">
 Go to Checkout Page
</button>
</div>
          </div>
          
        </>
      )}
    </div>
  );
}

export default Cartpage;
