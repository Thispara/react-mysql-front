import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleMenu, cartItems, setSearchTerm }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const cartItemCount = cartItems.reduce((count, item) => {
    return count + item.prod_quan; 
  }, 0);

  return (
    <header className="header">
      <div className="logo">
        <FaHome onClick={() => navigate('/')} />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
          <span className="search-text">Search</span>
        </button>
      </div>
      <div className="cart-icon" onClick={() => navigate('/checkout')}>
        <FaShoppingCart />
        <span className="cart-count">{cartItemCount}</span>
      </div>
    </header>
  );
};

export default Header;
