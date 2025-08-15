import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Checkout() {
  const { items, clearCart, getTotal } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({ name: '', address: '', phone: '' });

  const placeOrder = async e => {
    e.preventDefault();
    if (!isAuthenticated) return alert('Please login first.');
    setLoading(true);
    try {
      const payload = items.map(i => ({ productId: i.product.id, quantity: i.qty }));
      await api.post('/bookings', payload);
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to place order: ' + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return (
    <div className="container my-5 text-center" style={{ color: '#212121' }}>
      <h4>Your cart is empty</h4>
    </div>
  );

  const pageStyle = {
    background: 'linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)',
    minHeight: '100vh',
    paddingTop: '30px',
    paddingBottom: '50px'
  };

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    padding: '20px'
  };

  const inputStyle = {
    borderRadius: '8px',
    borderColor: '#BDBDBD'
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    borderRadius: '50px',
    padding: '10px 20px',
    border: 'none',
    fontWeight: 'bold',
    width: '100%',
    transition: '0.3s'
  };

  return (
    <div className="container" style={pageStyle}>
      <div className="row g-4">
        {/* Shipping Form */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={{ color: '#212121' }}>Shipping Details</h5>
            <form onSubmit={placeOrder}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  required
                  className="form-control"
                  value={shipping.name}
                  onChange={e => setShipping({...shipping, name: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <textarea
                  required
                  className="form-control"
                  value={shipping.address}
                  onChange={e => setShipping({...shipping, address: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  required
                  className="form-control"
                  value={shipping.phone}
                  onChange={e => setShipping({...shipping, phone: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <button
                className="btn"
                style={buttonStyle}
                disabled={loading}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45a049'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
              >
                {loading ? 'Placing...' : `Place Order • ₹${getTotal().toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <h5 style={{ color: '#212121' }}>Order Summary</h5>
            {items.map(i => {
              const imageSrc = i.product.id
                ? `http://localhost:8080/api/products/${i.product.id}/image`
                : 'https://via.placeholder.com/50';

              return (
                <div
                  key={i.product.id}
                  className="d-flex align-items-center justify-content-between mb-2 p-2"
                  style={{
                    borderRadius: '8px',
                    transition: '0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f8e9'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={imageSrc}
                      alt={i.product.name}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}
                    />
                    <div>{i.product.name} x {i.qty}</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#212121' }}>
                    ₹{(i.product.price * i.qty).toFixed(2)}
                  </div>
                </div>
              );
            })}
            <hr style={{ borderColor: '#BDBDBD' }} />
            <div className="d-flex justify-content-between fw-bold">
              <div>Total</div>
              <div>₹{getTotal().toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
