import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProduct = ({ product, onSave }) => {
  const [prodName, setProdName] = useState(product.prod_name);
  const [prodPrice, setProdPrice] = useState(product.prod_price);
  const [prodQuan, setProdQuan] = useState(product.prod_quan);
  const [prodCode, setProdCode] = useState(product.prod_code);
  const [prodImg, setProdImg] = useState(null); // State to hold the new image file
  const [initialProdImg, setInitialProdImg] = useState(product.prod_img); // Initial image URL or filename
  const navigate = useNavigate();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('prod_id', product.prod_id);
    formData.append('prod_name', prodName);
    formData.append('prod_price', prodPrice);
    formData.append('prod_quan', prodQuan);
    formData.append('prod_code', prodCode);

    // Append the image only if a new image is selected, otherwise use the initial image
    if (prodImg) {
      formData.append('prod_img', prodImg);
    } else {
      formData.append('prod_img', initialProdImg);
    }

    try {
      const response = await axios.put(
        `http://https://node-backend-mysql-ff131785e8ac.herokuapp.com/api/products/${product.prod_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onSave(response.data);
      navigate('/');
    } catch (error) {
      console.error('Failed to save product details', error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form>
        <div>
          <label>Name</label>
          <input type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={prodQuan} onChange={(e) => setProdQuan(e.target.value)} />
        </div>
        <div>
          <label>Code</label>
          <input type="text" value={prodCode} onChange={(e) => setProdCode(e.target.value)} />
        </div>
        <div>
          <label>New Image</label>
          <input type="file" onChange={(e) => setProdImg(e.target.files[0])} />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
        <button onClick={() => navigate('/')} type="button">Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
