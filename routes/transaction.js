const express = require('express');
const auth = require('../middleware/auth');
const { z } = require('zod'); // Ensure zod is imported
const Transaction = require('../models/Transaction'); 
const Budget = require('../models/Budget'); // Import your Budget model
const transactionRouter = express.Router();

transactionRouter.use(auth);

// Define the transaction schema
const transactionSchema = z.object({
    amount: z.number()
        .positive({ message: "Amount must be a positive number" }),
    category: z.string()
        .min(1, { message: "Category is required" })
        .max(50, { message: "Category name is too long" }),
    type: z.enum(['income', 'expense'], { message: "Type is required" })
});

// Create a transaction
transactionRouter.post('/', async (req, res) => {
    try {
        // Validate incoming data
        const parsedData = transactionSchema.parse(req.body);
        const { amount, category, type } = parsedData;
        const userId = req.user.id; // Get the user ID from the auth middleware

        // Create the transaction
        const newTransaction = await Transaction.create({ userId, amount, category, type });

        // Update the budget based on transaction type
        if (type === 'income') {
            // Add to the budget for this category
            await Budget.findOneAndUpdate(
                { userId, category },
                { $inc: { amount: amount } }, // Increase budget
                { new: true, upsert: true } // Create if it doesn't exist
            );
        } else if (type === 'expense') {
            // Deduct from the budget for this category
            await Budget.findOneAndUpdate(
                { userId, category },
                { $inc: { amount: -amount } }, // Decrease budget
                { new: true, upsert: true } // Create if it doesn't exist
            );
        }

        // Respond with success
        res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
        // Handle validation errors from Zod
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

transactionRouter.get('/', async (req, res) => {
  try {
      const userId = req.user.id; // Get the user ID from the auth middleware
      const allTransactions = await Transaction.find({ userId }); // Fetch transactions for the logged-in user

      // Respond with success
      res.status(200).json({ transactions: allTransactions });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

// Delete a transaction
transactionRouter.delete('/:id', async (req, res) => {
    const transactionId = req.params.id; // Get the transaction ID from the URL parameters
    const userId = req.user.id; // Get the user ID from the auth middleware

    try {
        // Find and delete the transaction
        const deletedTransaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully", transaction: deletedTransaction });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = transactionRouter;

