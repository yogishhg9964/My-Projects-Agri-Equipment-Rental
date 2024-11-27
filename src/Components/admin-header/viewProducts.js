import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AdminBar from './admin-header';
import '../pages/styles/admin-events.css';

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const [editedProductData, setEditedProductData] = useState({
    productName: '',
    productDescription: '',
    amount: '',
  });
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editProductId, setEditProductId] = useState(null); // State to store the ID of the product being edited

  const handleDeleteProduct = async (productId) => {
    try {
      const token = cookies.access_token;
      await axios.delete(`http://localhost:8080/admin/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      alert("Product Deleted Successfully ....")
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleEditClick = (product) => {
    setEditMode(true);
    setEditProductId(product._id); // Set the ID of the product being edited
    setEditedProductData({
      productName: product.productName,
      productDescription: product.productDescription,
      amount: product.amount,
    });
  };

  const handleSaveClick = async () => {
    try {
      const token = cookies.access_token;
      const response = await axios.put(
        `http://localhost:8080/admin/products/${editProductId}`, // Use the ID of the product being edited in the PUT request URL
        editedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditedProductData(response.data);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setEditedProductData({
      ...editedProductData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <AdminBar />
      <div className="product-list-container">
        <div class="all-filter-products">
          <h1>Products List</h1>
          <ul>
            {products.map((product) => (
              <li type="none" key={product._id}>
                {product.productImage && (
                  <img
                    src={product.productImage.location}
                    alt={product.productImage.filename}
                  />
                )}
                <strong>{product.productName}</strong>
                <p>{product.productDescription}</p>
                <p class="item-price">Price: {product.amount}/- per day</p>
                <p class="category">Type: {product.category.categoryName}</p>
                <br></br>
                <div className='del'>
                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
