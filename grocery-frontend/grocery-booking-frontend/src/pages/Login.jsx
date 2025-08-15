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
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-5 product-card" style={{ maxWidth: 480, borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', backgroundColor: '#FFFFFF' }}>
        <h3 className="mb-4 text-center" style={{ color: '#4CAF50' }}>Welcome Back</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#212121' }}>Username</label>
            <input 
              required 
              className="form-control" 
              value={data.username} 
              onChange={e => setData({...data, username: e.target.value})}
              style={{ borderRadius: '8px', borderColor: '#4CAF50' }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#212121' }}>Password</label>
            <input 
              type="password" 
              required 
              className="form-control" 
              value={data.password} 
              onChange={e => setData({...data, password: e.target.value})}
              style={{ borderRadius: '8px', borderColor: '#4CAF50' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn w-100 fw-bold" 
            disabled={loading}
            style={{
              backgroundColor: '#4CAF50',
              color: '#FFFFFF',
              borderRadius: '50px',
              padding: '10px',
              transition: '0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45A049'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-3" style={{ color: '#212121' }}>
          Don’t have an account? <Link to="/register" style={{ color: '#FF9800', fontWeight: '500' }}>Create one</Link>
        </div>
      </div>
    </div>
  );
}
