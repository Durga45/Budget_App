import { useState, useEffect } from 'react';
import axios from 'axios';
import './comp.css'; // Import your CSS file

const MakeTransaction = () => {
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get("http://localhost:3000/api/user/budget", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.budgets); // Extract budgets
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleTransaction = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post("http://localhost:3000/api/user/transaction", {
        amount: Number(amount),
        category,
        type,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error("Error creating transaction:", error);
      setMessage("Failed to create transaction.");
    }
  };

  return (
    <div className="makeTransactionContainer">
      <h1>Make Transaction</h1>
      <input
        type="number"
        className="inputField"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select className="selectField" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map((budget) => (
          <option key={budget._id} value={budget.category}>
            {budget.category}
          </option>
        ))}
      </select>
      <select className="selectField" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button className="submitButton" onClick={handleTransaction}>Submit Transaction</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MakeTransaction;
