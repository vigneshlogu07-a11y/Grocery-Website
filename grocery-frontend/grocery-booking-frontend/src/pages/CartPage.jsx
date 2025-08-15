import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, updateQty, removeFromCart, getTotal } = useCart();

  const pageStyle = {
    background: 'linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)', // soft green fading to white
    minHeight: '100vh',
    paddingTop: '30px',
    paddingBottom: '50px'
  };

  if (items.length === 0) {
    return (
      <div className="container my-5 text-center" style={pageStyle}>
        <h4 style={{ color: '#212121' }}>Your cart is empty</h4>
        <Link className="btn" 
              to="/" 
              style={{ backgroundColor: '#4CAF50', color: '#FFFFFF', padding: '10px 20px', borderRadius: '50px', transition: '0.3s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Shop groceries
        </Link>
      </div>
    );
  }

  return (
    <div style={pageStyle} className="container">
      <div className="row">
        <div className="col-md-8">
          {items.map(i => {
            const imageSrc = i.product.id
              ? `http://localhost:8080/api/products/${i.product.id}/image`
              : 'https://via.placeholder.com/120';

            return (
              <div key={i.product.id} 
                   className="d-flex align-items-center mb-3 product-card p-3" 
                   style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)' }}>
                
                <img
                  src={imageSrc}
                  alt={i.product.name}
                  style={{
                    width: 120,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                />

                <div className="ms-3 flex-grow-1">
                  <div className="fw-semibold" style={{ color: '#212121' }}>{i.product.name}</div>
                  <div style={{ color: '#616161' }}>
                    ₹{i.product.price} x {i.qty}
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end">
                  <div className="mb-2">
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: '#FFEB3B', border: 'none', borderRadius: '50%', width: '30px', height: '30px', marginRight: '5px', fontWeight: 'bold', color: '#212121', transition: '0.3s' }}
                      onClick={() => updateQty(i.product.id, Math.max(1, i.qty - 1))}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: '#FFEB3B', border: 'none', borderRadius: '50%', width: '30px', height: '30px', fontWeight: 'bold', color: '#212121', transition: '0.3s' }}
                      onClick={() => updateQty(i.product.id, i.qty + 1)}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: '#FF9800', color: '#FFFFFF', borderRadius: '8px', border: 'none', transition: '0.3s', padding: '4px 8px' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fb8c00'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FF9800'}
                    onClick={() => removeFromCart(i.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <div className="product-card p-3" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)' }}>
            <h5 style={{ color: '#212121' }}>Order Summary</h5>
            <div className="d-flex justify-content-between my-2">
              <div>Items</div>
              <div>{items.length}</div>
            </div>
            <div className="d-flex justify-content-between my-2">
              <div>Total</div>
              <div>₹{getTotal().toFixed(2)}</div>
            </div>
            <Link 
              to="/checkout" 
              className="btn w-100 mt-2"
              style={{ backgroundColor: '#4CAF50', color: '#FFFFFF', borderRadius: '50px', padding: '10px', transition: '0.3s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
