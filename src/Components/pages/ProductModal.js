import React from 'react';
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import './styles/productModal.css';

const ProductModal = ({ product, onClose, onAddToCart, value }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <div className="modal-image">
            {product.productImage && (
              <img
                src={product.productImage.location}
                alt={product.productImage.filename}
              />
            )}
          </div>
          <div className="modal-details">
            <h2>{product.productName}</h2>
            <p className="modal-price">₹{product.amount}/- Only</p>
            <p className="modal-description">{product.productDescription}</p>
            <p className="modal-category"><b>Product Type: {product.category.categoryName}</b></p>
            <Box sx={{ '& > legend': { mt: 2 } }}>
              <Rating name="read-only" value={value} readOnly />
            </Box>
            <span className="free-delivery-txt">Free Delivery..!</span>
            <button 
              className="modal-cart-btn"
              onClick={() => onAddToCart(product._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
