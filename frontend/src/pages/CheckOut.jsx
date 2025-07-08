import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../App';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckOut = () => {
  const { quoteId, clearCart } = useContext(CartContext);
  const [quote, setQuote] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Fetch the quote from backend using quoteId
  useEffect(() => {
    if (!quoteId) return;
    fetch(`http://localhost:3000/api/quotes/${quoteId}`)
      .then(res => res.json())
      .then(data => setQuote(data));
  }, [quoteId]);

  // Download Quote as JSON
  const downloadQuoteJSON = () => {
    if (!quote) return;
    const blob = new Blob([JSON.stringify(quote, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quote-${quote._id}.json`;
    link.click();
  };

  // Stripe payment handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setPaymentError('');
    setPaymentSuccess(false);

    // 1. Create PaymentIntent on backend
    const res = await fetch('http://localhost:3000/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(quote.total * 100) }), // amount in cents
    });
    const { clientSecret } = await res.json();

    // 2. Confirm card payment on frontend
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setPaymentError(result.error.message);
      setPaymentSuccess(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      setPaymentError('');
      clearCart();
    }
    setProcessing(false);
  };

  if (!quote) return <div className="text-center mt-10">Loading quote...</div>;

  return (
    <div className="min-h-screen bg-[#00796B] py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-[#00796B] mb-6 border-b pb-3">
          Checkout
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Quote Summary</h2>
          <p><span className="font-medium">Quote ID:</span> {quote._id}</p>
          <p><span className="font-medium">Date:</span> {new Date(quote.createdAt).toLocaleString()}</p>
        </div>

        <div className="space-y-4 mb-6">
          {quote.items.map((item, idx) => (
            <div key={idx} className="bg-[#f8f8f8] p-4 rounded border border-[#00796B]">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Duration:</strong> {item.duration}</p>
              <p><strong>Features:</strong> {item.features && item.features.join(', ')}</p>
              <p><strong>Locked Price:</strong> €{item.lockedPrice.toFixed(2)}</p>
              <p><strong>SIM Card Fee:</strong> €{item.simCardFee ? item.simCardFee.toFixed(2) : '0.00'}</p>
            </div>
          ))}
        </div>

        <div className="text-right text-lg font-bold text-[#00796B] mb-6">
          Total Amount: €{quote.total.toFixed(2)}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6">
          <button
            onClick={downloadQuoteJSON}
            className="bg-[#f17874] text-black px-6 py-3 rounded hover:bg-yellow-400 font-semibold transition"
          >
            Download Quote (JSON)
          </button>
        </div>

        {/* Stripe Payment Form */}
        {!paymentSuccess ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <CardElement className="border p-3 rounded mb-3" />
            <button
              type="submit"
              disabled={!stripe || processing}
              className="bg-[#1b796e] text-white px-6 py-3 rounded hover:bg-teal-600 font-semibold transition w-full"
            >
              {processing ? "Processing..." : "Pay"}
            </button>
            {paymentError && <div className="text-red-600 mt-2">{paymentError}</div>}
            <div className="mt-2 text-sm text-gray-600">
              Use test card: <strong>4242 4242 4242 4242</strong> (any future expiry, any CVC)
            </div>
          </form>
        ) : (
          <div className="text-green-700 text-xl font-bold text-center">
            Payment Successful! Thank you.
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
