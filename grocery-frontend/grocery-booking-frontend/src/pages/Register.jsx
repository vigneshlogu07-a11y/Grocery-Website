import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [data, setData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(data);
      alert('Registered. Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Register failed: ' + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 520 }}>
      <div className="card p-4 product-card">
        <h4 className="mb-3">Create account</h4>
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
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
