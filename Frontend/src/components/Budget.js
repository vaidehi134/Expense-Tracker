import React, { useEffect, useState } from "react";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [amount, setAmount] = useState("");
  const [addAmounts, setAddAmounts] = useState({}); // for add amount inputs per category

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/budget", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          window.location.href = "/login"; // Redirect if unauthorized
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setBudgets(data);
      })
      .catch((err) => console.error("Error fetching budgets:", err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_name: categoryName,
          amount: Number(amount),
        }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const newBudget = await res.json();
      setBudgets([...budgets, newBudget]);
      setCategoryName("");
      setAmount("");
    } catch (err) {
      console.error("Error adding budget:", err);
    }
  };

  const handleAddAmount = async (category_name) => {
    const addValue = Number(addAmounts[category_name] || 0);
    if (!addValue) return;

    try {
      const res = await fetch("http://localhost:4000/budget/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_name,
          amount: addValue,
        }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const updatedBudget = await res.json();

      const updated = budgets.map((b) =>
        b.category_name === category_name ? updatedBudget.updatedBudget : b
      );
      setBudgets(updated);
      setAddAmounts({ ...addAmounts, [category_name]: "" });
    } catch (err) {
      console.error("Error adding to budget:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Budget List</h2>
      {budgets.map((budget, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">Category: {budget.category_name}</h5>
            <p className="card-text">
              Remaining Amount: ₹{budget.amount_remaining}
            </p>

            <div className="input-group mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Add amount"
                value={addAmounts[budget.category_name] || ""}
                onChange={(e) =>
                  setAddAmounts({
                    ...addAmounts,
                    [budget.category_name]: e.target.value,
                  })
                }
              />
              <button
                className="btn btn-success"
                onClick={() => handleAddAmount(budget.category_name)}
              >
                Add Amount
              </button>
            </div>
          </div>
        </div>
      ))}

      <h3 className="mt-5">Add New Budget</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Budget
        </button>
      </form>
    </div>
  );
}

export default Budget;
