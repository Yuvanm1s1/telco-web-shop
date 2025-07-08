const Quote = require('../models/Quote');

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const { items, total } = req.body;
    const quote = new Quote({ items, total });
    await quote.save();
    res.status(201).json(quote);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
};

// Update an existing quote by ID
exports.updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, total } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      id,
      { items, total },
      { new: true }
    );
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    res.json(quote);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
};

// Get a quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
