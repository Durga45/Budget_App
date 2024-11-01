const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Don't forget to import bcrypt
const { z } = require('zod'); // Ensure zod is imported
const loginRouter = express.Router();


// Define the login schema
const userLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is required" }) // Add min length if needed
});

loginRouter.post('/', async (req, res) => {
    try {
        // Validate incoming data
        console.log("Decoded user from token:", req.user);
        const parsedData = userLoginSchema.parse(req.body);
        const { email, password } = parsedData;

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the password
        const validPassword = await bcrypt.compare(password, userExist.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: userExist._id, email: userExist.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        if (err.errors) {
            return res.status(400).json({ errors: err.errors });
        }
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = loginRouter; // Exporting loginRouter
