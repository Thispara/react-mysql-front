import React, { useState } from 'react';
import AddProductForm from './AddProductForm'; 
import './FloatingButton.css'; 
import { FaPlusCircle } from "react-icons/fa";

const FloatingButton = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="floating-action-button">
      <button className ="add-button" onClick={toggleForm}>
        <FaPlusCircle size={32}/>
      </button>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <AddProductForm />
            <button className="close-button" onClick={toggleForm}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
