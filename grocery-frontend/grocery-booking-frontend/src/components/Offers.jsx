import React from "react";
import "./Offers.css";

export default function Offers() {
  const offers = [
    { title: "Flat 20% Off", desc: "On all fresh fruits & vegetables", code: "FRESH20" },
    { title: "Buy 1 Get 1", desc: "On selected dairy products", code: "DAIRYB1G1" },
    { title: "Free Delivery", desc: "On orders above ₹500", code: "FREE500" },
  ];

  return (
    <div 
      className="container my-5 position-relative offers-section"
      style={{ 
        padding: '2rem', 
        borderRadius: '20px', 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBF0 100%)', 
        overflow: 'hidden', 
        minHeight: '60vh'
      }}
    >
      {/* Subtle decorative background circles */}
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        top: '-40px',
        left: '-40px',
        zIndex: 0,
      }}></div>
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'rgba(76, 175, 80, 0.08)',
        bottom: '-50px',
        right: '-50px',
        zIndex: 0,
      }}></div>

      <h2 
        className="section-title text-center mb-4 position-relative" 
        style={{ color: '#212121', zIndex: 1 }}
      >
        🔥 Offers & Discounts
      </h2>

      <div className="row position-relative" style={{ zIndex: 1 }}>
        {offers.map((offer, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div 
              className="card offer-card shadow-sm"
              style={{ 
                background: 'linear-gradient(145deg, #FFEB3B20, #FFFFFF)', 
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                zIndex: 1
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title fw-bold" style={{ color: '#2e7d32' }}>
                  {offer.title}
                </h5>
                <p className="card-text mb-3" style={{ color: '#616161' }}>
                  {offer.desc}
                </p>
                <span 
                  className="badge offer-code fw-bold"
                  style={{ 
                    backgroundColor: '#FF9800', 
                    color: '#FFFFFF', 
                    padding: '8px 12px', 
                    fontSize: '0.9rem', 
                    borderRadius: '12px' 
                  }}
                >
                  {offer.code}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
