// src/components/Cart.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({ cart = [], onRemove }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart — <Link to="/products">browse products</Link></p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong><br />
                  <small className="text-muted">₹{item.price} each</small>
                </div>

                <div className="text-end">
                  <div>Qty: {item.quantity}</div>
                  <div><strong>₹{item.price * item.quantity}</strong></div>
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h4>Total: ₹{total}</h4>
          <button className="btn btn-primary me-2" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

