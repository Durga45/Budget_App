import { useEffect, useState } from 'react';
import axios from 'axios';

const MyBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get("http://localhost:3000/api/user/budget", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBudgets(response.data.budgets);
            } catch (err) {
                console.error("Error fetching budgets:", err);
                setError(err.response ? err.response.data.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    const handleDelete = async (budgetId) => {
        try {
            const token = localStorage.getItem('userToken');
            const url = `http://localhost:3000/api/user/budget/${budgetId}`;
            await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });

            setBudgets((prevBudgets) => prevBudgets.filter(b => b._id !== budgetId));
        } catch (error) {
            console.error("Error deleting budget:", error.response ? error.response.data : error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="myBudgetsContainer">
            <h1>My Budgets</h1>
            <div>
                {budgets.length === 0 ? (
                    <p>No budgets found.</p>
                ) : (
                    budgets.map((budget) => (
                        <div key={budget._id} className="budgetItem">
                            <p>Amount: {budget.amount}</p>
                            <p>Category: {budget.category}</p>
                            <p>Date: {new Date(budget.createdAt).toLocaleDateString()}</p>
                            <button onClick={() => handleDelete(budget._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBudgets;
