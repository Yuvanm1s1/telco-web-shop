const mongoose = require('mongoose');


const mongoURI = 'mongodb://localhost:27017/my-mongo';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

const express = require('express');
const app = express();
app.use(express.json());


const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);


app.post('/user', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});


app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
