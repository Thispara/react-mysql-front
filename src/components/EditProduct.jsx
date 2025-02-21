import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodQuan, setProdQuan] = useState('');
  const [prodCode, setProdCode] = useState('');
  const [prodImg, setProdImg] = useState(null); // State to hold the new image file
  const [initialProdImg, setInitialProdImg] = useState(''); // Initial image URL or filename
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://mysql-api-766e0b27643c.herokuapp.com/api/products/${id}`);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        setProdName(fetchedProduct.prod_name);
        setProdPrice(fetchedProduct.prod_price);
        setProdQuan(fetchedProduct.prod_quan);
        setProdCode(fetchedProduct.prod_code);
        setInitialProdImg(fetchedProduct.prod_img); // Set initial image if available
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('prod_id', id);
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
        `https://mysql-api-766e0b27643c.herokuapp.com/api/products/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Product updated successfully:', response.data);
      // Perform any action upon successful save
      navigate('/');
    } catch (error) {
      console.error('Failed to save product details:', error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {product ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
