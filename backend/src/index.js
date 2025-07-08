const mongoose = require('mongoose');
const quoteRoutes = require('./routes/quoteRoutes');
const express = require('express');
const mongoURI = 'mongodb://localhost:27017/my-mongo';
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payment');
require('dotenv').config();
const cors = require('cors');
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));


const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin which is the frontend
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(bodyParser.json());


// const userSchema = new mongoose.Schema({ name: String });
// const User = mongoose.model('User', userSchema);


// app.post('/user', async (req, res) => {
//   const user = new User({ name: req.body.name });
//   await user.save();
//   res.json(user);
// });


// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });
app.use("/api/quotes",quoteRoutes)
app.use('/api/payment', paymentRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
