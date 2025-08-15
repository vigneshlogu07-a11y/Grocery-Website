import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/Online_Shoping_29.jpg';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div 
      className="hero d-flex flex-column flex-md-row align-items-center justify-content-between p-5"
      style={{
        background: 'linear-gradient(135deg, #e8f5e9, #ffffff)',
        borderRadius: '16px',
        margin: '20px',
        color: '#212121',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      {/* Left Text */}
      <div className="text-center text-md-start mb-4 mb-md-0">
        <h1 className="display-5 fw-bold mb-3" style={{ color: '#2e7d32', lineHeight: '1.2' }}>
          Fresh groceries, delivered fast
        </h1>
        <p className="lead mb-4" style={{ color: '#4CAF50', fontSize: '1.15rem' }}>
          Local produce, daily essentials — hand-picked and delivered to your door.
        </p>
        <div className="d-flex justify-content-center justify-content-md-start gap-3">
          <button 
            className="btn fw-bold shadow-sm"
            style={{ 
              backgroundColor: '#4CAF50', 
              color: '#FFFFFF', 
              borderRadius: '50px', 
              padding: '12px 30px', 
              fontSize: '1.1rem', 
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = '#43a047';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#4CAF50';
            }}
            onClick={() => navigate('/')}
          >
            Shop Now
          </button>
          <button 
            className="btn fw-bold shadow-sm"
            style={{ 
              backgroundColor: 'transparent', 
              color: '#4CAF50', 
              border: '2px solid #4CAF50', 
              borderRadius: '50px', 
              padding: '12px 30px', 
              fontSize: '1.1rem', 
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = '#FF9800';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FF9800';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#4CAF50';
              e.currentTarget.style.borderColor = '#4CAF50';
            }}
            onClick={() => navigate('/cart')}
          >
            View Cart
          </button>
        </div>
      </div>

      {/* Right Image Card */}
      <div className="d-none d-md-block" style={{ maxWidth: '380px' }}>
        <div 
          className="premium-card text-center p-2" 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: '16px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)', 
            transition: '0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <img 
            src={heroImg} 
            alt="Fresh groceries" 
            style={{ width: '100%', borderRadius: '16px' }} 
          />
          <small 
            className="fw-semibold d-block mt-2"
            style={{ color: '#FF9800' }}
          >
            Free delivery over ₹499
          </small>
        </div>
      </div>
    </div>
  );
}
