import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Show success message
    toast.success("Logged out successfully");

    // Redirect to login page after short delay (optional)
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h3>Logging out...</h3>
    </div>
  );
}

export default Logout;
