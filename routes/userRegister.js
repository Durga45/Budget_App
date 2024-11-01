const express = require('express');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const User = require('../models/User');

const userRouter = express.Router(); // Changed variable name

// Define the registration schema
const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

// Register route
userRouter.post('/', async (req, res) => {
    try {
        // Validate incoming data
        const parsedData = registerSchema.parse(req.body);
        const { name, email, password } = parsedData;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });

        // Respond with success
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = userRouter; // Exporting as userRouter
