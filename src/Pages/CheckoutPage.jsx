import React from "react";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CheckoutPage = () => {
  const getMyUser = useSelector((store) => store.myTodo.Todo.data);
  const [itemCounts, setItemCounts] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const [productData, setProductsData] = useState([]);
  // eslint-disable-next-line
  const [error, seterror] = useState("");
  // eslint-disable-next-line
  const navigate = useNavigate();
  const userdata = getMyUser;
  const filteredItems = [...new Set(Array.from(userdata))];
  // eslint-disable-next-line
  const notify = () => toast("Order Placed Successfully!");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);
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

  // const [data, setdata] = useState({
  //   firstname: "",
  //   address: "",
  //   phone: "",
  // });

  const setdatafields = (e) => {
    const { value, name } = e.target;
    setFormMessage("");
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  

  const clickShippingButton = (e) => {
    e.preventDefault();
    if (!userData.firstName || !userData.address || !userData.phone) {
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
        },
      });
    }
    //  }
  };
  const id = localStorage.getItem("id");
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${id}`
      );
      const userData = response.data;

      setUserData({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address.address,
        city: userData.address.city,
        state: userData.address.state,
        phone: userData.phone,
        age: userData.age,
        gender: userData.gender,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
    

      <div className="  row mx-3 justify-content-evenly">
        <div className="col-md-5">
          <p className="text-white">Contact information</p>
          <h3 className="fw-bold"> Shipping Address</h3>

          {formMessage && <p className="text-danger">{formMessage}</p>}
          <form>
            <div className="form-row d-flex">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="First Name"
                  name="firstName"
                  onChange={setdatafields}
                  value={userData.firstName}
                />
              </div>
              <div className="form-group col-md-5 ms-2">
                <label htmlFor="inputPassword4">LastName</label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={setdatafields}
                />
              </div>
            </div>
            <div className="form-group col-md-11">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="address"
                onChange={setdatafields}
                value={userData.address}
              />
            </div>
            <div className="form-group col-md-11">
              <label htmlFor="inputAddresss">Phone Number</label>
              <input
                className="form-control"
                id="inputAddresss"
                placeholder="1234 "
                name="phone"
                onChange={setdatafields}
                value={userData.phone}
              />
            </div>

            <div className="form-row  d-flex">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  value={userData.city}
                />
              </div>
              <div className="form-group col-md-5 ms-2">
                <label htmlFor="inputState">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  value={userData.state}
                />
                {/* <select
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
                </select> */}
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
      <ToastContainer theme="light" />
    </div>
  );
};

export default CheckoutPage;
