const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., "Groceries", "Salary"
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['income', 'expense'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
