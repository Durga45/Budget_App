import axios from "axios";
import { useState, useEffect } from "react";
import './comp.css'; 

const MyTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get("http://localhost:3000/api/user/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data.transactions);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const token = localStorage.getItem('userToken');
      const url = `http://localhost:3000/api/user/transaction/${transactionId}`;


      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove the deleted transaction
      setTransactions(prevTransactions => prevTransactions.filter(t => t._id !== transactionId));
    } catch (error) {
      console.error("Error deleting transaction:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="myTransactionsContainer">
      <h1>My Transactions</h1>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction._id} className="transactionItem">
            <p>{transaction.amount}</p>
            <p>{transaction.category}</p>
            <p>{transaction.type}</p>
            <p>{new Date(transaction.date).toLocaleDateString()}</p>
            <button onClick={() => handleDeleteTransaction(transaction._id)}>Delete</button> {/* Delete button */}
          </div>
        ))
      )}
    </div>
  );
}

export default MyTransaction;
