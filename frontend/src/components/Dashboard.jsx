import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetHeader from './BudgetHeader';
import BudgetSetter from './BudgetSetter';
import MyBudgets from './MyBudgets';
import MyTransaction from './MyTransaction';
import MakeTransaction from './MakeTransaction';

const Dashboard = () => {
  const name = localStorage.getItem('username'); // Retrieve username from local storage
  const navigate = useNavigate();

  // Check for token in localStorage
  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const [showBudgetSetter, setShowBudgetSetter] = useState(false);
  const [showMyBudgets, setShowMyBudgets] = useState(false);
  const [showMyTransaction, setShowMyTransaction] = useState(false);
  const [showMakeTransaction, setShowMakeTransaction] = useState(false);

  const logout = () => {
    localStorage.clear(); // Clear local storage on logout
    navigate('/login'); // Redirect to the login page
  };

  const handleCreateBudget = () => {
    setShowBudgetSetter(prevState => !prevState);
    setShowMyBudgets(false);
    setShowMyTransaction(false);
    setShowMakeTransaction(false);
  };

  const handleShowMyBudgets = () => {
    setShowMyBudgets(prevState => !prevState);
    setShowBudgetSetter(false);
    setShowMyTransaction(false);
    setShowMakeTransaction(false);
  };

  const handleShowMyTransaction = () => {
    setShowMyTransaction(prevState => !prevState);
    setShowBudgetSetter(false);
    setShowMyBudgets(false);
    setShowMakeTransaction(false);
  };

  const handleShowMakeTransaction = () => {
    setShowMakeTransaction(prevState => !prevState);
    setShowBudgetSetter(false);
    setShowMyBudgets(false);
    setShowMyTransaction(false);
  };

  return (
    <>
      <div className="dashboardContainer">
        <h1 className="welcomeMessage">{`Hi ${name}, Welcome to the Budget App`}</h1>
        <button className="logoutButton" onClick={logout}>Logout</button>
      </div>
      <div>
        <BudgetHeader 
          onCreateBudget={handleCreateBudget} 
          onShowMyBudgets={handleShowMyBudgets} 
          onShowMyTransaction={handleShowMyTransaction} 
          onShowMakeTransaction={handleShowMakeTransaction}
        />
      </div>
      {showBudgetSetter && (
        <div>
          <BudgetSetter />
        </div>
      )}
      {showMyBudgets && (
        <div>
          <MyBudgets />
        </div>
      )}
      {showMyTransaction && (
        <div>
          <MyTransaction />
        </div>
      )}
      {showMakeTransaction && (
        <div>
          <MakeTransaction />
        </div>
      )}
    </>
  );
};

export default Dashboard;
