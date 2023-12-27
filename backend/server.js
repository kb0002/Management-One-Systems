// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('your-mongodb-uri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes (Assuming you have already implemented routes as mentioned in previous responses)
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const libraryTransactionRoutes = require('./routes/libraryTransactionRoutes');

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/adminUsers', adminUserRoutes);
app.use('/api/transactions', libraryTransactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
