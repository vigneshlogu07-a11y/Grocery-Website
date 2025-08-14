import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [data, setData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(data);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 520 }}>
      <div className="card p-4 product-card">
        <h4 className="mb-3">Login</h4>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input required className="form-control" value={data.username} onChange={e=>setData({...data, username:e.target.value})}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" required className="form-control" value={data.password} onChange={e=>setData({...data, password:e.target.value})}/>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <Link to="/register">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
