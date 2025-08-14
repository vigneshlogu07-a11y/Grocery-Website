import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, updateQty, removeFromCart, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4>Your cart is empty</h4>
        <Link className="btn btn-primary mt-3" to="/">Shop groceries</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          {items.map(i => {
            const imageSrc = i.product.id
              ? `http://localhost:8080/api/products/${i.product.id}/image`
              : 'https://via.placeholder.com/120';

            return (
              <div key={i.product.id} className="d-flex align-items-center mb-3 product-card p-3">
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
                  <div className="fw-semibold">{i.product.name}</div>
                  <div className="text-muted-2">
                    ₹{i.product.price} x {i.qty}
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => updateQty(i.product.id, Math.max(1, i.qty - 1))}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => updateQty(i.product.id, i.qty + 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
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
          <div className="product-card p-3">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between my-2">
              <div>Items</div>
              <div>{items.length}</div>
            </div>
            <div className="d-flex justify-content-between my-2">
              <div>Total</div>
              <div>₹{getTotal().toFixed(2)}</div>
            </div>
            <Link to="/checkout" className="btn btn-primary w-100">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
