const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 0 }, // Amount for the budget
    category: { type: String, required: true } // e.g., "Food", "Entertainment"
}, { timestamps: true });

module.exports = mongoose.model('Budget', BudgetSchema);
