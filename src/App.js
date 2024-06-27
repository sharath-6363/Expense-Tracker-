import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({ name: '', amount: '', description: '' });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      setExpenses(parsedExpenses);
      setTotal(parsedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
    setTotal(newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0));
    setExpense({ description: '', amount: '', name: '' });
  };

  const handleDeleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
    setTotal(newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Expense Tracker</h1>
      <div className="card p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="name"
              value={expense.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="₹ Amount"
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="description"
              value={expense.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="col-12">
            <button onClick={handleAddExpense} className="btn btn-primary w-100">Add Expense</button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered overflow-hidden">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>₹ Amount</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className=''>
            {expenses.map((exp, index) => (
              <tr key={index}>
                <td>{exp.name}</td>
                <td>₹{exp.amount}</td>
                <td>{exp.description}</td>
                <td><button className="btn btn-danger" onClick={() => handleDeleteExpense(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto fs-4 mt-3 card flexwidth">Total: {total}₹</p>
    </div>
  );
};

export default App;
