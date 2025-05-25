import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddExpense() {
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

   const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/budget", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    const requiredFields = [
      "id",
      "name",
      "price",
      "date",
      "description",
      "category_name",
    ];

    const hasAllFields = requiredFields.every((field) => data[field]);

    if (!hasAllFields) {
      setErrorMessage("Please fill all the fields before submitting.");
      return;
    }

    setErrorMessage("");

    fetch("http://localhost:4000/product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Added Successfully");
        navigate("/expenses");
      })
      .catch(() => {
        toast.error("Failed to add expense");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4">Add New Expense</h2>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="form-group row mb-3">
          <label htmlFor="id" className="col-4 col-form-label">
            Enter ID
          </label>
          <div className="col-8">
            <input
              name="id"
              onChange={handleChange}
              type="number"
              className="form-control"
              placeholder="Enter product ID"
            />
          </div>
        </div>

        <div className="form-group row mb-3">
          <label htmlFor="name" className="col-4 col-form-label">
            Expense Name
          </label>
          <div className="col-8">
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Enter product name"
            />
          </div>
        </div>

        <div className="form-group row mb-3">
          <label htmlFor="category_name" className="col-4 col-form-label">
            Category
          </label>
          <div className="col-8">
            <select
              name="category_name"
              onChange={handleChange}
              className="form-control"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat.category_name}>
                    {cat.category_name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-group row mb-3">
          <label htmlFor="price" className="col-4 col-form-label">
            Price
          </label>
          <div className="col-8">
            <input
              name="price"
              onChange={handleChange}
              type="number"
              className="form-control"
              placeholder="Enter price"
            />
          </div>
        </div>

        <div className="form-group row mb-4">
          <label htmlFor="date" className="col-4 col-form-label">
            Date
          </label>
          <div className="col-8">
            <input
              name="date"
              onChange={handleChange}
              type="date"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row mb-4">
          <label htmlFor="description" className="col-4 col-form-label">
            Description
          </label>
          <div className="col-8">
            <textarea
              name="description"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter product description"
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="offset-4 col-8">
            <button onClick={handleSubmit} className="btn btn-primary">
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
