import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product, addCartItem, opencart }) => {
  const handleAddToCart = () => {
    addCartItem(product.id);
    opencart();
  };

  return (
    <div className="col-md-3">
      <div className="card mt-4 shadow" style={{ height: "500px", border: "none" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top shadow"
          height="250px"
        />

        <div
          className="shadow rounded"
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="card-body text-center mt-3">
            <NavLink
              to={`/Productdetail/${product.id}`}
              className="text-decoration-none text-danger"
            >
              <h5 className="card-title text-info">{product.title}</h5>
            </NavLink>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Price: {product.price}</p>
          </div>
          <button
            className="btn btn-info text-white pb-2 px-4 py-2"
            style={{
              marginLeft: "30%",
              marginRight: "5%",
              marginBottom: "30px",
              width: "40%",
              maxWidth: "300px",
            }}
            type="button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
