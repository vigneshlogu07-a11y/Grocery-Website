import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="footer-section text-white">
      <div className="container py-3"> {/* Reduced padding */}
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="/shop">Shop</a></li>
              <li><a href="/offers">Offers</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title">Help</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title">Contact Info</h5>
            <p>📍 123 Grocery Street, Chennai, TN</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@grocerybooking.com</p>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-sm-6 mb-3">
            <h5 className="footer-title">Follow Us</h5>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="text-center small">
          © {new Date().getFullYear()} Grocery Booking. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
