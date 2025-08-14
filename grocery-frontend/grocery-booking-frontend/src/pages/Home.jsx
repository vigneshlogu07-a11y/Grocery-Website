import React from 'react';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

export default function Home() {
  return (
    <div className="container my-4">
      <Hero />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Fresh Picks</h4>
        <small className="text-muted-2">Updated daily</small>
      </div>
      <ProductGrid />
    </div>
  );
}
