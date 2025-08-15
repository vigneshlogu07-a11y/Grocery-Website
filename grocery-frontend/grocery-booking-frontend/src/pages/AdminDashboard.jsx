// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaShoppingCart, FaTags } from 'react-icons/fa';

export default function AdminDashboard() {
  const cardStyle = (bgColor, textColor) => ({
    backgroundColor: bgColor,
    color: textColor,
    borderRadius: '16px',
    padding: '2rem 1rem',
    transition: 'transform 0.3s, box-shadow 0.3s',
  });

  const hoverStyle = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
  };

  const leaveStyle = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 fw-bold" style={{ color: '#388E3C' }}>
        Admin Dashboard
      </h1>

      <div className="row g-4">
        {/* Manage Products */}
        <div className="col-md-4">
          <Link to="/admin/products" className="text-decoration-none">
            <div
              className="card text-center h-100 shadow-sm"
              style={cardStyle('#4CAF50', '#FFFFFF')}
              onMouseEnter={hoverStyle}
              onMouseLeave={leaveStyle}
            >
              <FaBoxOpen size={50} className="mb-3" />
              <h4 className="card-title fw-bold">Manage Products</h4>
            </div>
          </Link>
        </div>

        {/* View Orders */}
        <div className="col-md-4">
          <Link to="/admin/orders" className="text-decoration-none">
            <div
              className="card text-center h-100 shadow-sm"
              style={cardStyle('#2196F3', '#FFFFFF')}
              onMouseEnter={hoverStyle}
              onMouseLeave={leaveStyle}
            >
              <FaShoppingCart size={50} className="mb-3" />
              <h4 className="card-title fw-bold">View Orders</h4>
            </div>
          </Link>
        </div>

        {/* Manage Offers */}
        <div className="col-md-4">
          <Link to="/admin/offers" className="text-decoration-none">
            <div
              className="card text-center h-100 shadow-sm"
              style={cardStyle('#FFEB3B', '#212121')}
              onMouseEnter={hoverStyle}
              onMouseLeave={leaveStyle}
            >
              <FaTags size={50} className="mb-3" />
              <h4 className="card-title fw-bold">Manage Offers</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
