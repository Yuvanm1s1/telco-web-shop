// routes/payment.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; 
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur', 
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;