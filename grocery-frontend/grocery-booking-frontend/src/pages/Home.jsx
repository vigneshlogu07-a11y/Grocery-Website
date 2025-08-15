import React from 'react';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

export default function Home() {
  return (
    <div 
      className="container my-4 p-3"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF, #F9FFF4)', // subtle vertical gradient
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
      }}
    >
      <Hero />

      <div 
        className="d-flex justify-content-between align-items-center mb-3 px-2 py-1"
        style={{
          backgroundColor: 'rgba(76, 175, 80, 0.08)', // subtle green accent
          borderRadius: '12px'
        }}
      >
        <h4 className="mb-0" style={{ color: '#2e7d32' }}>Fresh Picks</h4>
        <small className="text-muted">Updated daily</small>
      </div>

      <ProductGrid />
    </div>
  );
}
