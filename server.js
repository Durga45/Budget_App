require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/DbConnection');
const register = require('./routes/userRegister');
const login = require('./routes/userLogin');
const budget = require("./routes/userBudget");
const transaction = require("./routes/transaction");
const cors = require('cors');

const app = express();
app.use(cors());
ConnectDB(); // Connect to the database

// Middleware to parse JSON
app.use(express.json());

// Use the user routes
app.use('/api/user/register', register);
app.use('/api/user/login', login);
app.use('/api/user/budget', budget);
app.use('/api/user/transaction', transaction);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
