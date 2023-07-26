import React from "react";
import { NavLink } from "react-router-dom";
import "./Product.css";

const Product = ({ product, addCartItem, opencart,height }) => {
  const handleAddToCart = () => {
    addCartItem(product.id);
    opencart();
  };

  return (
   
    <div className="col-md-3 ">
     
      <div className="card  shadow cardcss">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top shadow"
          height="250px"
        />

        <div
          className=" shadow rounded"
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="card-body text-center mt-3">
            <NavLink
              to={`/product/${product.id}`}
              className="text-decoration-none text-danger"
            >
              <h5 className="card-title text-info">{product.title}</h5>
            </NavLink>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Price: {product.price}</p>
          </div>
          <button
            className="buttoncss  btn btn-info text-white pb-2 px-4 py-2"
          
         
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
