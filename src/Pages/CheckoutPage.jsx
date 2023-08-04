import React from "react";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "react-bootstrap";
import NavbarCom from "../components/Layout/navbar";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  

const CheckoutPage = () => {
  const getMyUser = useSelector((store) => store.myTodo.Todo.data);
  const [itemCounts, setItemCounts] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const [productData, setProductsData] = useState([]);
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const userdata = getMyUser;
  const filteredItems = [...new Set(Array.from(userdata))];
  const notify = () => toast("Order Placed Successfully!");
  useEffect(() => {
    const countItems = () => {
      const counts = {};
      for (let i = 0; i < userdata.length; i++) {
        const itemId = userdata[i];
        counts[itemId] = counts[itemId] ? counts[itemId] + 1 : 1;
      }
      setItemCounts(counts);
    };

    countItems();
  }, [userdata]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const data = await response.json();

      setProductsData(data.products);
    } catch (error) {
      seterror(error);
    }
  };
  const getTotalPrice = () => {
    let totalPrice = 0;
    for (const itemId in itemCounts) {
      // eslint-disable-next-line
      const item = productData.find((product) => product.id == itemId);
      if (item) {
        const itemPrice = item.price * itemCounts[itemId];
        totalPrice += itemPrice;
      }
    }
    return totalPrice;
  };

  const [data, setdata] = useState({
    firstname: "",
    address: "",
    phone: "",
  });

  const setdatafields = (e) => {
    const { value, name } = e.target;
    setFormMessage("");
    setdata(() => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const clickShippingButton = (e) => {
    e.preventDefault();
    if (!data.firstname || !data.address || !data.phone) {
      setFormMessage("Please fill in all fields.");
    } 
    // else
    // {
      // const getUser = localStorage.getItem("key");
      // if (!data.firstname || data.firstname.length === 0) {
      //   setFormMessage("Please Sign in first.");
      //   navigate("/Signup");
      // } 
      else {
     
        toast("Order Placed Successfully!", {
          autoClose: 3000,
          style: {
            background: "DodgerBlue", 
            color: "#ffffff", 
       } },)
       
      }
  //  }
  };

  return (
    <div>
      <NavbarCom />

      <div className="  row mx-3 justify-content-evenly">
        <div className="col-md-5">
          <p>{error}</p>
          
          <p className="text-white">Contact information</p>
          <p className="">
            Already have a account{" "}
            <span>
              <NavLink className="" to="/Login">
                Login
              </NavLink>
            </span>
          </p>
          Shipping Address
          <br />
          <br />
          <form>
            
            <div className="form-row">
            {formMessage && <p className="text-danger">{formMessage}</p>}
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="First Name"
                  name="firstname"
                  onChange={setdatafields}
                />
              
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">LastName</label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="address"
                onChange={setdatafields}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddresss">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="inputAddresss"
                placeholder="1234 "
                name="phone"
                onChange={setdatafields}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select
                  id="inputState"
                  className="form-control"
                  defaultValue="Choose..."
                >
                  <option disabled hidden>
                    Choose...
                  </option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Australia">Australia</option>
                  <option value="America">America</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check"></div>
            </div>
            <button
              type="submit"
              className="btn btn-info text-white"
              onClick={(e) => {
                clickShippingButton(e);
              
              }}
              //disabled={!data.firstname || !data.address || !data.phone}
            >
              Continue to Shipping
            </button>

            <br />
            <br />
            <br />
          </form>
        </div>

        <div className="col-md-5">
          <div className="card " style={{ border: "none" }}>
            {filteredItems.map((itemId, index) => {
              const product = productData.find(
                // eslint-disable-next-line
                (product) => product.id == itemId
              );

              if (product) {
                return (
                  <div key={index} className="row ps-3  text-center ps-4 ">
                    <div className="col-md-4 pt-5">
                      <div key={product.id} className="product-item">
                        <div className="  product-image">
                          <img
                            src={product.thumbnail}
                            style={{ height: "110px" }}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 pt-5">
                      <div className="card-body justify-content-center   mx-3">
                        <NavLink
                          to={`/product/${product.id}`}
                          className="text-decoration-none text-danger"
                        >
                          <h2 className="card-title text-center pt-2 text-info">
                            {product.title}
                          </h2>
                        </NavLink>
                        <div className="text-center">{itemCounts[itemId]}</div>

                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Price: ${product.price * itemCounts[itemId]}
                          </li>
                          <li className="list-group-item">
                            Brand: {product.brand}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            <div>
              <hr />
              <p>Total Price: ${getTotalPrice()}</p>
              <br />
            </div>
          </div>
        </div>
      
      </div>
      <ToastContainer theme="light"
/>
    </div>
  );
};

export default CheckoutPage;
