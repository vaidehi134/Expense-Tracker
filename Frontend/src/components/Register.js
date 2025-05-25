import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Registered successfully!");
    } else {
      setMessage(data.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            value={form.username}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={form.password}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <div className="mt-3 text-success">{message}</div>
      </form>
    </div>
  );
}

export default Register;
