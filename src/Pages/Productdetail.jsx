import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import "../App.css";
import { addToCart } from "../Store/AddCartSlice";
import { useDispatch } from "react-redux";
import { addvalue } from "../Store/CartSlice";
import { Audio } from "react-loader-spinner";

const Productdetail = () => {
  const { paramid } = useParams();
  // const [addcart, setaddcart] = useState([]);
  const [productData, setProductsData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("//dummyjson.com/products");
      const data = await response.json();
      setProductsData(data.products);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // useEffect(() => {
  //   const storedCart = localStorage.getItem("idkey");
  //   if (storedCart) {
  //     setaddcart(JSON.parse(storedCart));
  //   }
  // }, []);

  const dispatch = useDispatch();
  const addCartItem = (id) => {
    // alert("Item Added Successfully");
    // setaddcart((prevCart) => {
    //   const updatedCart = [...prevCart, id];
    //   localStorage.setItem("idkey", JSON.stringify(updatedCart));
    //   return updatedCart;
    // });

    dispatch(addToCart(id));
    dispatch(addvalue(true));
  };

  return (
    <div>
      <Navbar />
      <div className="row justify-content-evenly mt-4 mt-5 mb-5">
        <div className="col-md-5">
          <div className="card">
            {productData.length === 0 ? (
              <div className="col-12 d-flex justify-content-center mt-5">
                <Audio type="Oval" color="#00BFFF" height={100} width={100} />
              </div>
            ) : (
              productData.map((product) => {
                if (product.id === parseInt(paramid)) {
                  console.log("test", product.id === paramid);
                  return (
                    <div key={product.id}>
                      <img
                        className="card-img-top"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            {productData.length === 0 ? (
              <div className="col-12 d-flex justify-content-center mt-5">
                <Audio type="Oval" color="#00BFFF" height={100} width={100} />
              </div>
            ) : (
              productData.map((product) => {
                if (product.id === parseInt(paramid)) { 
                  return (
                    <div key={product.id}>
                      <div className="card-body">
                        <h2 className="card-title">{product.title}</h2>
                        <p className="card-text">{product.description}</p>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Price: ${product.price}
                          </li>
                          <li className="list-group-item">
                            Discount: {product.discountPercentage}%
                          </li>
                          <li className="list-group-item">
                            Rating: {product.rating}/5
                          </li>
                          <li className="list-group-item">
                            Brand: {product.brand}
                          </li>
                          <li className="list-group-item">
                            Stock: {product.stock} units
                          </li>
                          <button
                            className="mybtn btn bg-info text-white"
                            type="button"
                            data-toggle="button"
                            aria-pressed="false"
                            autoComplete="off"
                            onClick={() => addCartItem(product.id)}
                          >
                            Add to Cart
                          </button>
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Productdetail;
