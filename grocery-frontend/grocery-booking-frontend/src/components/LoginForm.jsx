// src/components/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "", visible: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (status.visible) {
      const timer = setTimeout(() => setStatus({ ...status, visible: false }), 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "", visible: false });

    try {
      await login(username, password);
      setStatus({ type: "success", message: "Login successful! Redirecting...", visible: true });
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.error || "Invalid username or password", visible: true });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div 
            className="card shadow"
            style={{ borderRadius: "12px", overflow: "hidden", background: "linear-gradient(180deg, #FFFFFF, #F9FFF5)", position: 'relative' }}
          >
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-center" style={{ color: "#388E3C" }}>Login</h3>

              {/* Status Message Slide Down */}
              {status.visible && (
                <div 
                  className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} text-center`}
                  style={{
                    borderRadius: "8px",
                    padding: "0.8rem 1rem",
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "90%",
                    opacity: status.visible ? 1 : 0,
                    transition: "all 0.5s ease",
                    zIndex: 10
                  }}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input 
                    className="form-control" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required 
                    style={{ borderRadius: "8px", borderColor: "#BDBDBD" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    style={{ borderRadius: "8px", borderColor: "#BDBDBD" }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn w-100 fw-bold"
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                    borderRadius: "50px",
                    padding: "10px 0",
                    transition: "0.3s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#45a049"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4CAF50"}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
