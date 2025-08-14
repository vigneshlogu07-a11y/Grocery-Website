import React from "react";
import "./Offers.css";

export default function Offers() {
  const offers = [
    { title: "Flat 20% Off", desc: "On all fresh fruits & vegetables", code: "FRESH20" },
    { title: "Buy 1 Get 1", desc: "On selected dairy products", code: "DAIRYB1G1" },
    { title: "Free Delivery", desc: "On orders above ₹500", code: "FREE500" },
  ];

  return (
    <div className="container my-5 offers-section">
      <h2 className="section-title text-center mb-4">🔥 Offers & Discounts</h2>
      <div className="row">
        {offers.map((offer, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card offer-card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">{offer.desc}</p>
                <span className="badge bg-primary offer-code">{offer.code}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
