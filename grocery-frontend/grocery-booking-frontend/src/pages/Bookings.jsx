import React, { useEffect, useState } from "react";
import api from "../services/api"; 
import { FaAppleAlt, FaCheese, FaBoxOpen } from "react-icons/fa";
import "./Bookings.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return window.location.href = "/login";

    api
      .get("/bookings/me")
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401) window.location.href = "/login";
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Loading bookings...</div>;

  const getItemIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("apple") || lower.includes("fruit")) return <FaAppleAlt />;
    if (lower.includes("cheese") || lower.includes("milk") || lower.includes("dairy")) return <FaCheese />;
    return <FaBoxOpen />;
  };

  return (
    <div 
      className="container my-5 position-relative"
      style={{ 
        minHeight: '80vh', 
        padding: '2rem',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
        borderRadius: '20px',
        overflow: 'hidden'
      }}
    >
      {/* Subtle decorative circle accents */}
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        top: '-30px',
        left: '-30px',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        bottom: '-50px',
        right: '-50px',
        zIndex: 0
      }}></div>

      <h2 className="mb-4 text-center fw-bold position-relative" style={{ color: "#388E3C", fontSize: '2.2rem', zIndex: 1 }}>
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-muted position-relative" style={{ zIndex: 1 }}>You have no bookings yet.</p>
      ) : (
        <div className="row g-4 position-relative" style={{ zIndex: 1 }}>
          {bookings.map((booking) => {
            const totalItems = booking.items.reduce((sum, item) => sum + item.quantity, 0);
            const totalAmount = booking.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

            return (
              <div className="col-md-6 col-lg-4" key={booking.id}>
                <div 
                  className="card booking-card shadow-sm position-relative"
                  style={{ 
                    borderRadius: "16px", 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    zIndex: 1,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Mini Order Badge */}
                  <span 
                    className="badge position-absolute top-0 start-100 translate-middle rounded-pill bg-warning text-dark shadow-sm"
                    style={{ fontSize: '0.85rem', padding: '0.35em 0.7em', zIndex: 2 }}
                  >
                    {totalItems} items
                  </span>

                  <div className="card-header text-white fw-bold" style={{ backgroundColor: "#4CAF50", borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                    Booking #{booking.id}
                  </div>

                  <div className="card-body" style={{ color: "#212121" }}>
                    <p><strong>Date:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                    <ul className="list-group list-group-flush mb-2">
                      {booking.items.map((item) => (
                        <li 
                          key={item.productId} 
                          className="list-group-item d-flex align-items-center justify-content-between"
                          style={{ border: "none", padding: "0.5rem 0", fontSize: '0.95rem' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <span style={{ fontSize: '1.1rem', color: '#4CAF50' }}>{getItemIcon(item.productName)}</span>
                            <span>{item.productName}</span>
                          </div>
                          <span className="badge bg-success">{item.quantity} × ₹{item.price.toLocaleString("en-IN")}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 mb-0 fw-semibold text-end">Total: ₹{totalAmount.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center" style={{ backgroundColor: "#F5F5F5", borderRadius: '0 0 16px 16px' }}>
                    <span>Status:</span>
                    <span className="badge" style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}>Confirmed</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
