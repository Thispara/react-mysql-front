import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    prod_name: '',
    prod_price: '',
    prod_quan: '',
    prod_img: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, prod_img: e.target.files[0] });
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

      const formDataUpload = new FormData();
      formDataUpload.append('prod_name', formData.prod_name);
      formDataUpload.append('prod_price', formData.prod_price);
      formDataUpload.append('prod_quan', formData.prod_quan);
      formDataUpload.append('prod_code', generatedCode);
      formDataUpload.append('prod_img', formData.prod_img);

      const response = await axios.post('https://node-backend-mysql-ff131785e8ac.herokuapp.com/api/upload', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
      // Optionally: Display success message or redirect to product list

      // Reset form data after successful submission
      setFormData({
        prod_name: '',
        prod_price: '',
        prod_quan: '',
        prod_img: null,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, display error message to user
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
