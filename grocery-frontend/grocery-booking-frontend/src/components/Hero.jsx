import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero d-flex align-items-center justify-content-between">
      <div>
        <h1 className="display-6 fw-bold">Fresh groceries, delivered fast</h1>
        <p className="lead text-white-60">Local produce, daily essentials — hand-picked and delivered to your door.</p>
        <div className="mt-3">
          <button className="btn btn-light btn-lg me-2" onClick={() => navigate('/')}>Shop Now</button>
          <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/cart')}>View Cart</button>
        </div>
      </div>
      <div className="d-none d-md-block" style={{ width: 320 }}>
        <div className="premium-card text-center">
          <img src="src/assets/Online_Shoping_29.jpg" alt="fruits" style={{ width: '100%', borderRadius: 8 }} />
          <small className="text-muted-2">Free delivery over ₹499</small>
        </div>
      </div>
    </div>
  );
}
