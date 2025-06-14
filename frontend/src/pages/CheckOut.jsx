import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../App';

const CheckOut = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [quote, setQuote] = useState(null);

  const generateQuoteObject = () => {
    const quoteId = `Q-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const items = cartItems.map((item) => ({
      name: item.name,
      description: item.description,
      duration: item.duration,
      features: item.features,
      lockedPrice: item.lockedPrice,
      simCardFee: item.simCardFee,
    }));

    const total = cartItems.reduce((sum, item) => sum + item.lockedPrice, 0);

    return {
      quoteId,
      date: timestamp,
      items,
      totalAmount: total.toFixed(2),
      currency: 'EUR',
    };
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const generatedQuote = generateQuoteObject();
      setQuote(generatedQuote);
    }
  }, [cartItems]);

  const downloadQuoteJSON = () => {
    if (!quote) return;
    const blob = new Blob([JSON.stringify(quote, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${quote.quoteId}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#00796B] py-8 px-4">
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-[#00796B] mb-6 border-b pb-3">
      Checkout
    </h1>

    {quote ? (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Quote Summary</h2>
          <p><span className="font-medium">Quote ID:</span> {quote.quoteId}</p>
          <p><span className="font-medium">Date:</span> {new Date(quote.date).toLocaleString()}</p>
        </div>

        <div className="space-y-4 mb-6">
          {quote.items.map((item, index) => (
            <div key={index} className="bg-[#f8f8f8] p-4 rounded border border-[#00796B]">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Duration:</strong> {item.duration}</p>
              <p><strong>Features:</strong> {item.features.join(', ')}</p>
              <p><strong>Locked Price:</strong> €{item.lockedPrice.toFixed(2)}</p>
              <p><strong>SIM Card Fee:</strong> €{item.simCardFee.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="text-right text-lg font-bold text-[#00796B] mb-6">
          Total Amount: €{quote.totalAmount}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={downloadQuoteJSON}
            className="bg-[#f17874] text-black px-6 py-3 rounded hover:bg-yellow-400 font-semibold transition"
          >
            Download Quote (JSON)
          </button>
          <button
            className="bg-[#1b796e] text-white px-6 py-3 rounded hover:bg-teal-600 font-semibold transition"
          >
            Pay
          </button>
        </div>
      </>
    ) : (
      <p className="text-white">No items in cart to generate a quote.</p>
    )}
  </div>
</div>

  );
};

export default CheckOut;
