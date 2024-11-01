import { useState } from "react";
import axios from "axios"; 

const BudgetSetter = () => {
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('userToken'); 

      // Send the budget data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/user/budget",
        { amount: parseFloat(budget), category }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
     alert("budget added")
      console.log("Budget entry added:", response.data); 
    } catch (err) {
      if (err.response) {
        console.error("Error adding budget entry:", err.response.data); 
        alert(err.response.data.message || "An error occurred while adding the budget."); 
      } else {
        console.error("Error:", err.message);
        alert("An unexpected error occurred.");
      }
    }

    // Reset the input fields
    setBudget("");
    setCategory("");
  };

  return (
    <div className="budget-card">
      <h2 className="budget-title">Create Budget Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget">Budget Amount</label>
          <input
            id="budget"
            type="number"
            placeholder="Enter budget amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="budget-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="budget-input"
          />
        </div>
        <button type="submit" className="submit-button">Add Budget Entry</button>
      </form>
    </div>
  );
};

export default BudgetSetter;
