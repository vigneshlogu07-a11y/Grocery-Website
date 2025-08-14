import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function CartModal() {
  const { items, updateQty, removeFromCart, getTotal } = useCart();

  return (
    <div className="cart-modal">
      <div className="p-3">
        {items.length === 0 ? (
          <div className="text-center py-5">Your cart is empty</div>
        ) : (
          <>
            {items.map(i => (
              <div key={i.product.id} className="d-flex align-items-center mb-3">
                <img src={i.product.imageUrl || 'https://via.placeholder.com/80'} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
                <div className="ms-3 flex-grow-1">
                  <div className="fw-semibold">{i.product.name}</div>
                  <div className="text-muted-2">₹{i.product.price} x {i.qty}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => updateQty(i.product.id, Math.max(1, i.qty - 1))}>-</button>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQty(i.product.id, i.qty + 1)}>+</button>
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(i.product.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="fw-bold">Total: ₹{getTotal().toFixed(2)}</div>
              <Link to="/checkout" className="btn btn-primary">Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
