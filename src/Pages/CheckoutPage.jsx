
import React from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import products from "../Products/Products.json";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/footer";
const CheckoutPage = () => {
  const getMyUser = useSelector((store) => store.myTodo.Todo.data);
  const [itemCounts, setItemCounts] = useState({});
  const [showData, setShowData] = useState([]);
  const [productData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const userdata = getMyUser;
  const filteredItems = [...new Set(Array.from(userdata))];
  console.log("userdata",userdata);
  console.log("filterd",filteredItems);
  
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
      const response = await fetch(
        "https://dummyjson.com/products"
      );
      const data = await response.json();
    
      setProductsData(data.products);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getTotalPrice = () => {
    let totalPrice = 0;
    for (const itemId in itemCounts) {
      const item = products.find((product) => product.id == itemId);
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
    setdata(() => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const clickShippingButton = () => {
    if (!data.firstname || !data.address || !data.phone) {
      alert("Fill in all fields");
    } else {
      const getUser = localStorage.getItem("key");
      if (!getUser || getUser.length === 0) {
        alert("Please Sign in first");
        navigate("/Signup");
      } else {
        alert("Order placed successfully");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4  row mx-3 justify-content-evenly">
        <div className="col-md-5">
        <p className="text-white">Contact information</p>
          <p className="mt-4">
            Already have a account{" "}
            <span>
              <NavLink className="" to="/Login">Login</NavLink>
            </span>
          </p>
          Shipping Address
          <br />
          <br />
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="First Name"
                  name="firstname"
                  onChange={setdatafields}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">LastName</label>
                <input
                  type="Text"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="address"
                onChange={setdatafields}
              />
            </div>
            <div class="form-group">
              <label for="inputAddresss">Phone Number</label>
              <input
                type="number"
                class="form-control"
                id="inputAddresss"
                placeholder="1234 "
                name="phone"
                onChange={setdatafields}
              />
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                  <option selected>Choose...</option>
                  <option>Pakistan</option>
                  <option>Australia</option>
                  <option>America</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check"></div>
            </div>
            <button
              type="submit"
              class="btn btn-info text-white"
              onClick={clickShippingButton}
            >
              Continue to Shipping
            </button>
            <br />
            <br />
            <br />
          </form>
         
        </div>

        <div className="col-md-5">
          <div className="card " style={{border:"none"}}>
            {console.log("hlo",filteredItems)}
          {filteredItems.map((itemId) => {
          
          
                  const product = productData.find(
                    (product) => product.id == itemId
                  );
                 
                  if (product) {
                    return (
                      <div className="row ps-3 pt-2 text-center ps-4 ">
                        <div className="col-md-4 pt-1">
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
                        <div className="col-md-8 pt-1">
                          <div className="card-body justify-content-center   mx-3">
                            <NavLink
                              to={`/Productdetail/${product.id}`}
                              className="text-decoration-none text-danger"
                            >
                              <h2 className="card-title text-center pt-2 text-info">
                                {product.title}
                              </h2>
                            </NavLink>
                            <div className="text-center">
                              
                              {itemCounts[itemId]}
                             
                            </div>

                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                Price: ${product.price * itemCounts[itemId]}
                              </li>
                              <li className="list-group-item">
                                Brand: {product.brand}
                              </li>
                              {/* <Button variant="info" className="checkout-button"> */}
                              {/* <NavLink
                                to={`/CheckoutPage/${product.id}`}
                                className="text-decoration-none text-white px-3 text-center py-1 btn btn-info"
                              >
                                Go to Checkout
                              </NavLink> */}
                              {/* </Button> */}
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
              
              <hr/>
              <p>Total Price: ${getTotalPrice()}</p>
              <br/>
            </div>
           
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CheckoutPage;
