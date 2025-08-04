import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import Wishlist from './pages/Wishlist';
import ProductList from './pages/ProductList';
import './App.css';

function App() {
  return (
    <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <ProductList />
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Navbar />
                <ProductPage />
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <CartPage />
                <Footer />
              </>
            } />
            <Route path="/wishlist" element={
              <>
                <Navbar />
                <Wishlist />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
  );
}

export default App;