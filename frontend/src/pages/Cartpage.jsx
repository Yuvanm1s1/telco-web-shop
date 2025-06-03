// import React from 'react'

// function Cartpage({cartItems}) {
//     const services=cartItems
//   return (
//     <div>
//       Cart Page
//     </div>
//   )
// }

// export default Cartpage
import React from 'react';

function Cartpage({ cartItems,clearCart}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                   
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (<>
        <div className="grid gap-4">
          {cartItems.map((item, index) => (
                <div key={index} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>{item.description}</p>
              <p className="font-bold mt-2">€{item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className='bg-green-950 text-white text-1xl w-40 p-4 rounded-lg hover:bg-green-700'>
                <button onClick={()=>{
                    clearCart();
                }}>Remove all from cart</button>
            </div>
            </>
      )}
    </div>
  );
}

export default Cartpage;
