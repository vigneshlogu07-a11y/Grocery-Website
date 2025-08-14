import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
        <img 
        src="src/assets/logo.png" 
        alt="Grocery Logo" 
        style={{ height: '40px', marginRight: '8px' }} 
      />Grocery<span className="text-primary">+ </span></Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/bookings">My Bookings</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/offers">Offers</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

          </ul>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary position-relative" onClick={() => navigate('/cart')}>
              <FaShoppingCart />
              <span className="badge bg-danger rounded-pill position-absolute" style={{ top: '-6px', right: '-10px' }}>
                {items.length}
              </span>
            </button>

            {user ? (
              <>
                <span className="text-muted-2">Hi, <strong>{user}</strong></span>
                <button className="btn btn-sm btn-primary" onClick={() => { logout(); navigate('/'); }}>Logout</button>
              </>
            ) : (
              <Link className="btn btn-primary btn-sm" to="/login"><FaUser /> &nbsp; Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
