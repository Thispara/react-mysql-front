// FloatingActionButton.jsx

import React, { useState } from 'react';
import AddProductForm from './AddProductForm'; // Adjust the import path as per your project structure
import './FloatingButton.css'; // Import CSS for styling
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
