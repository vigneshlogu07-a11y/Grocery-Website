import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    borderRadius: '50px',
    padding: '10px 20px',
    fontWeight: 'bold',
    transition: '0.3s',
    border: 'none'
  };

  const inputStyle = {
    borderRadius: '8px',
    borderColor: '#BDBDBD'
  };

  return (
    <div 
      className="container my-5 contact-section position-relative" 
      style={{ minHeight: '70vh', overflow: 'hidden' }}
    >
      {/* Subtle background circles */}
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: 'rgba(76, 175, 80, 0.08)',
        top: '-50px',
        left: '-50px',
        zIndex: 0,
      }}></div>
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'rgba(76, 175, 80, 0.05)',
        bottom: '-70px',
        right: '-70px',
        zIndex: 0,
      }}></div>

      <h2 
        className="section-title text-center mb-4 position-relative" 
        style={{ color: '#4CAF50', zIndex: 1 }}
      >
        📞 Contact Us
      </h2>

      <div className="row justify-content-center position-relative" style={{ zIndex: 1 }}>
        <div className="col-md-8">
          <form 
            className="p-4 shadow rounded" 
            onSubmit={handleSubmit} 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '12px', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.1)' 
            }}
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
                style={inputStyle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
                style={inputStyle}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="form-control"
                rows="4"
                required
                style={inputStyle}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn w-100" 
              style={buttonStyle}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
