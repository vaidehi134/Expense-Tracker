import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      console.log(
        "token",
        localStorage.getItem("token"),
        " userId : ",
        localStorage.getItem("userId")
      );

      setMessage("Login successful!");
      navigate("/dashboard");
    } else {
      setMessage(data.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
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
          Login
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="btn btn-secondary"
        >
          Register
        </button>
        <div className="mt-3 text-success">{message}</div>
      </form>
    </div>
  );
}

export default Login;
