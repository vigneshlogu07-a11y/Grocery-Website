import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      setError(null);
      setSuccess("✅ Admin login successful!");
      onLogin();
    } else {
      setSuccess(null);
      setError("❌ Invalid admin credentials!");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "400px",
        background: "linear-gradient(145deg, #FFFFFF, #F5F5F5)",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h3 className="text-center mb-4" style={{ color: "#4CAF50" }}>
        Admin Login
      </h3>

      {error && (
        <div
          style={{
            backgroundColor: "#FFCDD2",
            color: "#B71C1C",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            backgroundColor: "#C8E6C9",
            color: "#2E7D32",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ borderRadius: "8px", borderColor: "#BDBDBD" }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderRadius: "8px", borderColor: "#BDBDBD" }}
          />
        </div>
        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{
            background: "linear-gradient(90deg, #4CAF50, #81C784)",
            color: "#FFFFFF",
            borderRadius: "50px",
            padding: "10px",
            fontSize: "1rem",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "linear-gradient(90deg, #388E3C, #66BB6A)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "linear-gradient(90deg, #4CAF50, #81C784)")
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}
