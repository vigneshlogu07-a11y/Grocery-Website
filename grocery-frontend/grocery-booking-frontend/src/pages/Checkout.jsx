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
      const res = await api.post('/bookings', payload);
      clearCart();
      alert('Order placed successfully!');
      navigate('/'); // or to bookings page if you add it
    } catch (err) {
      console.error(err);
      alert('Failed to place order: ' + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return (
    <div className="container my-5 text-center">
      <h4>Your cart is empty</h4>
    </div>
  );

  return (
    <div className="container my-5" style={{ maxWidth: 900 }}>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 product-card">
            <h5>Shipping Details</h5>
            <form onSubmit={placeOrder}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input required className="form-control" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea required className="form-control" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input required className="form-control" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})}/>
              </div>
              <button className="btn btn-primary" disabled={loading}>{loading ? 'Placing...' : `Place Order • ₹${getTotal().toFixed(2)}`}</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 product-card">
            <h5>Order Summary</h5>
            {items.map(i => (
              <div key={i.product.id} className="d-flex justify-content-between mb-2">
                <div>{i.product.name} x {i.qty}</div>
                <div>₹{(i.product.price * i.qty).toFixed(2)}</div>
              </div>
            ))}
            <hr />
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
