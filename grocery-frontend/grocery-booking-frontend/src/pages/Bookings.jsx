import React, { useEffect, useState } from "react";
import api from "../services/api"; // your axios instance
import "./Bookings.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found — redirecting to login");
      window.location.href = "/login";
      return;
    }

    api
      .get("/bookings/me")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading bookings...</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center booking-title">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">You have no bookings yet.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => {
            const totalItems = booking.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const totalAmount = booking.items.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0
            );

            return (
              <div className="col-md-6 col-lg-4 mb-4" key={booking.id}>
                <div className="card booking-card shadow-sm">
                  <div className="card-header">
                    <strong>Booking #{booking.id}</strong>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Total Items:</strong> {totalItems}
                    </p>
                    <ul className="list-group list-group-flush mb-2">
                      {booking.items.map((item) => (
                        <li
                          key={item.productId}
                          className="list-group-item booking-item"
                        >
                          {item.productName} - {item.quantity} × ₹
                          {item.price.toLocaleString("en-IN")}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 mb-0">
                      <strong>Total Amount:</strong>{" "}
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="card-footer text-muted">
                    Status:{" "}
                    <span className="badge bg-success">Confirmed</span>
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
