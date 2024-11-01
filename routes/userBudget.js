const express = require('express');
const auth = require('../middleware/auth');
const { z } = require('zod');
const Budget = require('../models/Budget'); 
const budgetRouter = express.Router();

// Middleware for authentication
budgetRouter.use(auth);

// Define the budget schema
const budgetSchema = z.object({
    amount: z.number().positive({ message: "Amount must be a positive number" }),
    category: z.string().min(1, { message: "Category is required" }).max(50, { message: "Category name is too long" })
});

// Create a budget
budgetRouter.post('/', async (req, res) => {
    try {
        const parsedData = budgetSchema.parse(req.body);
        const { amount, category } = parsedData;
        const userId = req.user.id;

        const newBudget = await Budget.create({ userId, amount, category });
        res.status(201).json({ message: "Budget added successfully", budget: newBudget });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all budgets
budgetRouter.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const allBudgets = await Budget.find({ userId });
        res.status(200).json({ budgets: allBudgets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a budget
budgetRouter.delete('/:id', async (req, res) => {
    console.log(`DELETE request received for budget ID: ${req.params.id}`);
    console.log(`User ID from token: ${req.user.id}`);

    const budgetId = req.params.id;

    try {
        const deletedBudget = await Budget.findOneAndDelete({ _id: budgetId, userId: req.user.id });

        if (!deletedBudget) {
            console.log("Budget not found");
            return res.status(404).json({ message: "Budget not found" });
        }

        res.status(200).json({ message: "Budget deleted successfully", budget: deletedBudget });
    } catch (error) {
        console.error("Error deleting budget:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = budgetRouter;
