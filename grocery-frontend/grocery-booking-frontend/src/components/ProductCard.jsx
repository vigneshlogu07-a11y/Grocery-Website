import React from 'react';

export default function ProductCard({ product, onAdd }) {
  const imageSrc = product.id
    ? `http://localhost:8080/api/products/${product.id}/image`
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="card product-card">
      <img
        src={imageSrc}
        className="product-img"
        alt={product.name}
        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted-2">{product.category}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="price">₹{product.price.toFixed(2)}</div>
            <small className="text-muted">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </small>
          </div>
          <div>
            <button
              className="btn btn-primary"
              disabled={product.stock <= 0}
              onClick={() => onAdd(product)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
