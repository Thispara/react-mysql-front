import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProduct from './EditProduct';
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const MainContent = ({ addToCart, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://mysql-api-cdae84d5b54e.herokuapp.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.prod_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.prod_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleEdit = (product) => {
    setEditingProduct(product);
    navigate(`/edit/${product.prod_id}`);
  };

  const handleSave = async (updatedProduct) => {
    try {
      const response = await axios.put(`https://mysql-api-cdae84d5b54e.herokuapp.com/api/products/${updatedProduct.prod_id}`, updatedProduct);
      setProducts(products.map((prod) => (prod.prod_id === updatedProduct.prod_id ? response.data : prod)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mysql-api-cdae84d5b54e.herokuapp.com/api/products/${productToDelete.prod_id}`);
      setProducts(products.filter(prod => prod.prod_id !== productToDelete.prod_id));
      setProductToDelete(null);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleDeleteConfirmation = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };
  
  const closeModal = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="main-content">
      {editingProduct ? (
        <EditProduct product={editingProduct} onSave={handleSave} />
      ) : (
        filteredProducts.map(product => (
          <div className="product-card" key={product.prod_id}>
            <span className="delete-icon" onClick={() => toggleDeleteConfirmation(product)}>
              <TiDelete/>
            </span>
            {product.prod_img && (
              <img
                src={`data:image/png;base64,${product.prod_img}`}
                alt={product.prod_name}
                className="product-image"
              />
            )}
            <div className="product-details">
              <h3>{product.prod_name}</h3>
              <p>${product.prod_price}</p>
              <p>Quantity: {product.prod_quan}</p>
              <p>Code: {product.prod_code}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => handleEdit(product)}>Edit</button>
            </div>
            {showDeleteConfirmation && productToDelete && (
              <div className="modal" style={{ display: showDeleteConfirmation ? 'block' : 'none' }}>
                <div className="modal-content">
                  <p>Are you sure you want to delete this product?</p>
                  <button onClick={handleDelete}>Yes</button>
                  <button onClick={closeModal}>No</button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MainContent;
