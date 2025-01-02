import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminPanel } from './components/admin/AdminPanel';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/products/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ProductManagement } from './pages/admin/ProductManagement';
import { AddProducts } from './pages/admin/AddProducts';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/productmanagement" element={<ProductManagement />} />
            <Route path="/addproducts" element={<AddProducts />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const AppWrapper = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default AppWrapper;