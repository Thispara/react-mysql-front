import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Checkout from './components/Checkout.jsx';
import FloatingButton from './components/FloatingButton.jsx';
import EditProduct from './components/EditProduct.jsx';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.prod_id === product.prod_id);
    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.prod_id === product.prod_id ? { ...item, prod_quan: item.prod_quan + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, prod_quan: 1 }]);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header cartItems={cartItems} setSearchTerm={setSearchTerm} />
        <div className="main-layout">
          <Routes>
            <Route 
              path="/" 
              element={<MainContent addToCart={addToCart} searchTerm={searchTerm} />} 
            />
            <Route 
              path="/checkout" 
              element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} 
            />
            <Route 
              path="/edit/:id" 
              element={<EditProduct />} 
            />
          </Routes>
        </div>
        <FloatingButton />
      </div>
    </Router>
  );
};

export default App;
