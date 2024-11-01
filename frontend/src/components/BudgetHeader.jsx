const BudgetHeader = ({ onCreateBudget, onShowMyBudgets,onShowMyTransaction ,onShowMakeTransaction}) => {
  return (
    <div className="budgetHeaderContainer">
      <button className="budgetButton" onClick={onCreateBudget}>Create Budget</button>
      <button className="budgetButton" onClick={onShowMyBudgets}>My Budgets</button>
      <button className="budgetButton" onClick={onShowMyTransaction}>Transactions</button>
      <button className="budgetButton" onClick={onShowMakeTransaction}>Make transaction</button>
    </div>
  );
}

export default BudgetHeader;
