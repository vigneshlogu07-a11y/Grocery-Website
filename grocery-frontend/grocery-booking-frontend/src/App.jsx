import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CartPage from './pages/CartPage.jsx';
import Checkout from './pages/Checkout.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Bookings from './pages/Bookings.jsx';
import Offers from './components/Offers.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import PrivateAdminRoute from "./pages/PrivateAdminRoute.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";




// Admin Dashboard Page
import AdminDashboard from './pages/AdminDashboard.jsx';

// Admin-only route protection
// function PrivateAdminRoute({ children }) {
//   const role = localStorage.getItem('role'); // Should be set after login
//   return role === 'ADMIN' ? children : <Navigate to="/" />;
// }



export default function App() {

  
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
            {/* Admin Login Route */}
          <Route path="/admin-login" element={<AdminLogin />} />
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected User Route */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* User Bookings Page */}
          <Route path="/bookings" element={<Bookings />} />

          {/* Admin-only Routes */}
          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <AdminDashboard />
              </PrivateAdminRoute>
            }
          />
          <Route
             path="/admin/products"
             element={
           <PrivateAdminRoute>
              <AdminProducts />
          </PrivateAdminRoute>
           }
          />


        </Routes>
      </div>

      {/* Footer is global */}
      <Footer />
    </div>
  );
}
