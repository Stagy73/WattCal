import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedPseudo = DOMPurify.sanitize(pseudo);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedCountry = DOMPurify.sanitize(country);

    if (
      !sanitizedPseudo ||
      !sanitizedEmail ||
      !sanitizedPassword ||
      !sanitizedCountry
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: sanitizedPseudo,
            email: sanitizedEmail,
            password: sanitizedPassword,
            country: sanitizedCountry,
          }),
        }
      );

      if (response.ok) {
        toast.success("User registered successfully");
        setPseudo("");
        setEmail("");
        setPassword("");
        setCountry("");
      } else {
        toast.error("Error registering user");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Pseudo">Pseudo:</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <ToastContainer />
    </div>
  );
}

export default Register;
