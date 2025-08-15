import React, { useState } from 'react';
import './ProductCard.css'; // optional for additional CSS

export default function ProductCard({ product, onAdd }) {
  const [showPopup, setShowPopup] = useState(false);

  const imageSrc = product.id
    ? `http://localhost:8080/api/products/${product.id}/image`
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const handleAdd = () => {
    onAdd(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div 
      className="card product-card shadow-sm rounded-3 position-relative h-100"
      style={{
        background: 'linear-gradient(145deg, #FFFFFF, #F1F8E9)', // subtle gradient
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
      }}
    >
      {/* Subtle circular background accent behind the image */}
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: 'rgba(76, 175, 80, 0.08)',
        top: '10px',
        left: '10px',
        zIndex: 0
      }}></div>

      <img
        src={imageSrc}
        className="card-img-top product-img position-relative"
        alt={product.name}
        style={{ 
          borderTopLeftRadius: '0.75rem', 
          borderTopRightRadius: '0.75rem', 
          objectFit: 'cover', 
          height: '180px',
          zIndex: 1
        }}
        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
      />

      <div className="card-body d-flex flex-column justify-content-between position-relative" style={{ zIndex: 1 }}>
        <div>
          <h5 className="card-title fw-bold" style={{ color: '#212121' }}>{product.name}</h5>
          <p className="mb-2" style={{ color: '#616161', fontSize: '0.9rem' }}>{product.category}</p>
          <div className="price fw-semibold mb-1" style={{ color: '#4CAF50', fontSize: '1.1rem' }}>
            ₹{product.price.toFixed(2)}
          </div>
          <small 
            style={{ color: product.stock > 0 ? '#2e7d32' : '#FF9800', fontWeight: '500' }}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </small>
        </div>

        <div className="mt-3 position-relative">
          <button
            className="btn w-100 fw-bold shadow-sm"
            disabled={product.stock <= 0}
            onClick={handleAdd}
            style={{ 
              backgroundColor: '#4CAF50', 
              color: '#FFFFFF', 
              borderRadius: '50px', 
              padding: '10px 0', 
              fontSize: '1rem', 
              transition: 'all 0.3s ease' 
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Add
          </button>

          {/* Popup above the button */}
          {showPopup && (
            <div
              className="position-absolute start-50 translate-middle-x px-3 py-1 rounded shadow"
              style={{
                bottom: '110%',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                backgroundColor: '#FF9800',
                color: '#FFFFFF',
                transition: 'all 0.3s ease'
              }}
            >
              ✅ Added!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
