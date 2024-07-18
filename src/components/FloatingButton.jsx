import React, { useState } from 'react';
import AddProductForm from './AddProductForm'; 
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from 'react-icons/ti';

const FloatingButton = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className='floating-button'>
      <button className ="add-button" onClick={toggleForm}>
        <FaPlusCircle size={32}/>
      </button>
      <div/>
      </div>
      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <AddProductForm />
            <button className="add-product-button" type="submit">Add Product</button>
            <button className="close-button" onClick={toggleForm}>
              <TiDelete className="close-icon" size={32}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
