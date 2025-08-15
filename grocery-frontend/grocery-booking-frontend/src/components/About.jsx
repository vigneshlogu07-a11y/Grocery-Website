import React from "react";
import "./About.css";

export default function About() {
  return (
    <div 
      className="container my-5 about-section p-5"
      style={{ 
        background: 'linear-gradient(135deg, #f1f8e9, #ffffff)', 
        borderRadius: '16px', 
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)', 
        transition: '0.3s' 
      }}
    >
      <div className="row align-items-center g-5">
        {/* Image */}
        <div className="col-md-6">
          <img
            src="src/assets/about_us.jpg"
            alt="About Grocery Store"
            className="img-fluid rounded shadow-sm about-img"
            style={{ 
              borderRadius: '16px', 
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)', 
              transition: 'transform 0.3s, box-shadow 0.3s' 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
            }}
          />
        </div>

        {/* Text */}
        <div className="col-md-6">
          <h2 className="section-title fw-bold mb-4" style={{ color: '#388E3C', fontSize: '2.2rem' }}>
            About Us
          </h2>
          <p style={{ color: '#212121', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
            Welcome to <strong style={{ color: '#4CAF50' }}>Grocery Booking</strong>, your one-stop online shop for fresh produce, dairy, snacks, and more. 
            We are committed to providing <span style={{ fontWeight: '600' }}>high-quality products</span> at the best prices with fast delivery.
          </p>
          <p style={{ color: '#212121', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Our mission is to make grocery shopping <span style={{ color: '#388E3C', fontWeight: '600' }}>easier, faster, and more affordable</span> for every household.
          </p>
        </div>
      </div>
    </div>
  );
}
