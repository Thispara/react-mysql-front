import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  // Calculate total amount based on cart items
  const totalAmount = cartItems.reduce((total, item) => total + (item.prod_price * item.prod_quan), 0);

  const handleCheckout = async () => {
    try {
      // Prepare the data to send to the backend for checkout
      const productsWithQuantities = cartItems.map(item => ({
        prod_id: item.prod_id,
        prod_quan: item.prod_quan,
      }));

      // Example of a POST request to the backend API
      await axios.post('https://node-backend-mysql-ff131785e8ac.herokuapp.com/api/checkout', { products: productsWithQuantities });

      // Clear the cart after successful checkout
      setCartItems([]);
      setShowPopup(true); // Show the popup after successful checkout
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout');
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Function to close the popup
    navigate('/'); // Navigate to the home page after closing the popup
  };

  return (
    <div className="billing-background">
      <div className="billing-container">
        <h2 className="checkout-title">Checkout</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="item-details">
                    <div className="item-info">
                      <span className="item-name">{item.prod_name}</span>
                      <span className="item-price">${item.prod_price}</span>
                    </div>
                    <div className="item-quantity">
                      Quantity: {item.prod_quan}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-section">
              <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
              <div className="checkout-buttons">
                <button className="checkout-button" onClick={handleCheckout}>Check out</button>
                <button className="continue-shopping-button" onClick={() => navigate('/')}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup window */}
      {showPopup && (
        <div className="popup-background">
          <div className="popup-container">
            <p className="popup-message">Checkout successful!</p>
            <button className="popup-close-button" onClick={closePopup}>Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
