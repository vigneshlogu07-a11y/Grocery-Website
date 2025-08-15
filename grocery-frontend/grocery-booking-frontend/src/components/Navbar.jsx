import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Explicit route mapping
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cart', path: '/cart' },
    { name: 'My Bookings', path: '/bookings' },
    { name: 'Offers', path: '/offers' },
    { name: 'About Us', path: '/about' }, // fixed route
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4" 
         style={{ 
           background: 'linear-gradient(90deg, #4CAF50, #81C784)', 
           transition: '0.3s' 
         }}>
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="Grocery Logo" 
            style={{ 
              height: '45px', 
              marginRight: '10px', 
              borderRadius: '8px', 
              boxShadow: '1px 1px 5px rgba(0,0,0,0.3)' 
            }} 
          />
          <span className="text-white">Grocery<span style={{color:'#FFEB3B'}}>+</span></span>
        </Link>

        {/* Toggle for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link, idx) => (
              <li className="nav-item" key={idx}>
                <Link
                  className="nav-link fw-medium"
                  style={{ color: '#FFFFFF', transition: '0.3s' }}
                  to={link.path}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF9800'}
                  onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart & User */}
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn rounded-circle shadow-sm d-flex justify-content-center align-items-center"
              style={{ 
                width: '45px', 
                height: '45px', 
                backgroundColor: '#FFFFFF',
                color: '#212121',
                position: 'relative'
              }}
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart />
              <span 
                className="badge rounded-pill position-absolute" 
                style={{ 
                  top: '-5px', 
                  right: '-5px', 
                  backgroundColor: '#FFEB3B', 
                  color: '#212121',
                  fontSize: '0.7rem'
                }}
              >
                {items.length}
              </span>
            </button>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold text-white">Hi, {user}</span>
                <button 
                  className="btn rounded-pill shadow-sm"
                  style={{ 
                    backgroundColor: '#FF9800', 
                    color: '#212121', 
                    transition: '0.3s' 
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e68a00'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FF9800'}
                  onClick={() => { logout(); navigate('/'); }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                className="btn rounded-pill shadow-sm d-flex align-items-center gap-1 fw-bold"
                style={{ 
                  backgroundColor: '#FFEB3B', 
                  color: '#212121', 
                  transition: '0.3s' 
                }}
                to="/login"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5e100'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFEB3B'}
              >
                <FaUser /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
