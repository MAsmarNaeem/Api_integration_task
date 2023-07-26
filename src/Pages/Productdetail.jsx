import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { addToCart } from "../Store/AddCartSlice";
import { useDispatch } from "react-redux";
import { addvalue } from "../Store/CartSlice";
import { Audio } from "react-loader-spinner";


const Productdetail = () => {
  const { paramid } = useParams();
  const [productData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("//dummyjson.com/products?limit=100");
      const data = await response.json();
      setProductsData(data.products);
      setLoading(false); 
    } catch (error) {
      console.log("Error:", error);
      setLoading(false); 
    }
  };

  const dispatch = useDispatch();
  const addCartItem = (id) => {
    dispatch(addToCart(id));
    dispatch(addvalue(true));
  };

  const renderProductImage = () => {
    if (loading) {
      return (
        <div className="col-12 d-flex justify-content-center mt-5">
          <Audio type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }

    const selectedProduct = productData.find(
      (product) => product.id === parseInt(paramid)
    );

    if (!selectedProduct) {
      navigate("/404");
      return null;
    }

    return (
      <div key={selectedProduct.id}>
        <img
          className="card-img-top mt-5"
          src={selectedProduct.images[0]}
          alt={selectedProduct.title}
        />
      </div>
    );
  };

  const renderProductDetails = () => {
    if (loading) {
      return (
        <div className="col-12 d-flex justify-content-center mt-5">
          <Audio type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }

    const selectedProduct = productData.find(
      (product) => product.id === parseInt(paramid)
    );

    if (!selectedProduct) {
      navigate("/404");
      return null;
    }

    return (
      <div className="card-body " >
        <h2 className="card-title ">{selectedProduct.title}</h2>
        <p className="card-text">{selectedProduct.description}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Price: ${selectedProduct.price}</li>
          <li className="list-group-item">
            Discount: {selectedProduct.discountPercentage}%
          </li>
          <li className="list-group-item">
            Rating: {selectedProduct.rating}/5
          </li>
          <li className="list-group-item">Brand: {selectedProduct.brand}</li>
          <li className="list-group-item">
            Stock: {selectedProduct.stock} units
          </li>
          <button
            className="mybtn btn bg-info text-white"
            type="button"
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
            onClick={() => addCartItem(selectedProduct.id)}
          >
            Add to Cart
          </button>
        </ul>
      </div>
    );
  };

  return (
    <div>
     
      <div
        className="row justify-content-evenly mt-4 mt-5 mb-5"
   
      >
        {loading ? (
          <div className="col-12 d-flex justify-content-center mt-5">
            <Audio type="Oval" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <>
            <div className="col-md-5">
              <div className="card">{renderProductImage()}</div>
            </div>
            <div className="col-md-5">
              <div className="card">{renderProductDetails()}</div>
            </div>
          </>
        )}
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default Productdetail;
