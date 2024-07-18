import React, { useState } from 'react';
import axios from 'axios';
import './FloatingButton.css';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    prod_name: '',
    prod_price: '',
    prod_quan: '',
    prod_img: '', // Initialize as empty string for base64 data
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set prod_img to base64 string when file reading is complete
      setFormData({ ...formData, prod_img: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const generateProductCode = () => {
    // Generate a random alphanumeric code in the format XXX-XXX-XXX
    const code = Math.random().toString(36).replace('.', '').toUpperCase();
    return `${code.slice(0, 3)}-${code.slice(3, 6)}-${code.slice(6, 9)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const generatedCode = generateProductCode();

      const response = await axios.post('https://mysql-api-766e0b27643c.herokuapp.com/api/upload', {
        prod_name: formData.prod_name,
        prod_price: formData.prod_price,
        prod_quan: formData.prod_quan,
        prod_code: generatedCode,
        prod_img: formData.prod_img,
      });

      console.log('Product added successfully:', response.data);

      // Reset form fields after successful submission
      setFormData({
        prod_name: '',
        prod_price: '',
        prod_quan: '',
        prod_img: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prod_name">Product Name:</label>
          <input
            type="text"
            id="prod_name"
            name="prod_name"
            value={formData.prod_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prod_price">Price:</label>
          <input
            type="number"
            id="prod_price"
            name="prod_price"
            value={formData.prod_price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prod_quan">Quantity:</label>
          <input
            type="number"
            id="prod_quan"
            name="prod_quan"
            value={formData.prod_quan}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prod_img">Image:</label>
          <input
            type="file"
            id="prod_img"
            name="prod_img"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button className="add-product-button" type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
