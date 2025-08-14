import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="container my-5 about-section">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="src/assets/about_us.jpg"
            alt="About Grocery Store"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="section-title">About Us</h2>
          <p>
            Welcome to <strong>Grocery Booking</strong>, your one-stop online shop for
            fresh produce, dairy, snacks, and more. We are committed to providing high-quality products at the best prices with fast delivery.
          </p>
          <p>
            Our mission is to make grocery shopping easier, faster, and more affordable for every household.
          </p>
        </div>
      </div>
    </div>
  );
}
