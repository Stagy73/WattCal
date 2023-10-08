import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    if (!sanitizedEmail || !sanitizedPassword) {
      // Display a toast notification for validation error
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Make a POST request to authenticate the user
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/auth/login`,
        {
          method: "POST", // Use the correct endpoint for authentication
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: sanitizedEmail,
            password: sanitizedPassword, // Use "password" key instead of "hashedpassword"
          }),
        }
      );

      if (response.ok) {
        // User authenticated successfully, display a success toast
        toast.success("Login successful");

        // Optionally, you can redirect the user to a dashboard or another page here
      } else {
        // Handle authentication errors and display an error toast
        toast.error("Authentication failed. Check your credentials.");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      {/* Add the ToastContainer component to display toasts */}
      <ToastContainer />
    </div>
  );
}

export default Login;
