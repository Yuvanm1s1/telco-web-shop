const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Create a new quote (called when first item added)
router.post('/', quoteController.createQuote);

// Update quote by ID (called when cart updates)
router.put('/:id', quoteController.updateQuote);

// Get quote by ID (for checkout page)
router.get('/:id', quoteController.getQuoteById);

module.exports = router;
