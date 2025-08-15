import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-section" 
            style={{ backgroundColor: '#212121', color: '#FFFFFF', padding: '30px 0' }}>
      <div className="container">
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title fw-bold" style={{ color: '#4CAF50' }}>Quick Links</h5>
            <ul className="list-unstyled mb-0">
              {['Shop','Offers','About Us','Contact'].map((link, i) => (
                <li key={i}>
                  <a 
                    href={`/${link.toLowerCase().replace(/\s/g,'')}`} 
                    style={{ color: '#B0B0B0', textDecoration: 'none', transition: '0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF9800'}
                    onMouseLeave={e => e.currentTarget.style.color = '#B0B0B0'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title fw-bold" style={{ color: '#4CAF50' }}>Help</h5>
            {['FAQs','Return Policy','Privacy Policy','Terms & Conditions'].map((link,i)=>(
              <p key={i} style={{ marginBottom: '0.5rem' }}>
                <a 
                  href="#" 
                  style={{ color: '#B0B0B0', textDecoration: 'none', transition: '0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF9800'}
                  onMouseLeave={e => e.currentTarget.style.color = '#B0B0B0'}
                >
                  {link}
                </a>
              </p>
            ))}
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title fw-bold" style={{ color: '#4CAF50' }}>Contact Info</h5>
            <p>📍 123 Grocery Street, Chennai, TN</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@grocerybooking.com</p>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title fw-bold" style={{ color: '#4CAF50' }}>Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  style={{ color: '#4CAF50', fontSize: '1.2rem', transition: '0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF9800'}
                  onMouseLeave={e => e.currentTarget.style.color = '#4CAF50'}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ borderColor: '#424242', margin: '20px 0' }} />
        <div className="text-center small" style={{ color: '#B0B0B0' }}>
          © {new Date().getFullYear()} Grocery Booking. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
