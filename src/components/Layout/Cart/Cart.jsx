import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Link, NavLink } from "react-router-dom";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addvalue } from "../../../Store/CartSlice";
import { addToCart } from "../../../Store/AddCartSlice";
import { removeFromCart } from "../../../Store/AddCartSlice";
//import style from "../components/navbar.css";

function Sidebar(props) {
  const store = useSelector((store) => store);
  const getStore = useSelector((store) => store);
   // eslint-disable-next-line
  const [show, setShow] = useState(store.addvalue.Todo.todos);
  const[error,seterror]=useState("")

  const [cartItems, setCartItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const demo = () => {};

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("//dummyjson.com/products?limit=100");
      const data = await response.json();
      setProductData(data.products);
    } catch (error) {
     seterror(error)
    }
  };

  useEffect(() => {
    const storedCart = getStore.myTodo.Todo.data;

    if (storedCart) {
      setCartItems(storedCart);
    }
  }, [getStore.myTodo.Todo.data]);

  useEffect(() => {
    const countItems = () => {
      const counts = {};
      for (let i = 0; i < cartItems.length; i++) {
        const itemId = cartItems[i];

        counts[itemId] = counts[itemId] ? counts[itemId] + 1 : 1;
      }
      setItemCounts(counts);
    };

    countItems();
  }, [cartItems]);

  const addItemCounter = (itemId) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
    dispatch(addToCart(itemId));
  };
  const delItemCounter = (itemId) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) - 1,
    }));
    dispatch(removeFromCart(itemId));
  };

  const handleClose = () => {
    setShow(false);
    dispatch(addvalue(false));
  };
  const handleShow = () => dispatch(addvalue(true));

  //const filteredItems = [...new Set(cartItems)];
  const filteredItems = [...new Set(Array.from(cartItems))];

  const getTotalPrice = () => {
    let totalPrice = 0;

    filteredItems.forEach((itemId) => {
      const product = productData.find((product) => product.id === itemId);

      if (product) {
        totalPrice += product.price * itemCounts[itemId];
      }
    });

    return totalPrice.toFixed(2);
  };

  return (
    <>
      <>
        <Link to="#"
  className="nav-link mar-top"
   
  onClick={handleShow}
>
  Cart
</Link>
  

        <Offcanvas
          placement="end"
          show={store.addvalue.Todo.todos}
          onHide={handleClose}
          backdrop={false}
          
          style={{top:"53px",width:"310px"}}
          
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {filteredItems.length > 0 ? (
              <div className="product-list">
                {filteredItems.map((itemId) => {
                  const product = productData.find(
                    (product) => product.id === itemId
                  );

                  if (product) {
                    return (
                      <div   key={itemId} className="row ps-3 pt-2 text-center ps-4 ">
                        <p>{error}</p>
                        <div className="col-md-4 pt-1">
                          <div key={product.id} className="product-item">
                            <div className="  product-image">
                              <img
                                src={product.thumbnail}
                                // style={{ height: "110px" }}

                                height="150px"
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
                              <Button
                                variant="info"
                                className="text-white px-2 py-1"
                                onClick={() => {
                                  addItemCounter(itemId);
                                }}
                              >
                                +
                              </Button>
                              {itemCounts[itemId]}
                              <Button
                                variant="info"
                                className="text-white px-2 py-1"
                                onClick={() => {
                                  delItemCounter(itemId);
                                  demo();
                                }}
                              >
                                -
                              </Button>
                            </div>

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
                <div
                  className="pt-4 ps-2 px-5 py-2 checkout-css"
                  // style={{ width: "450px", borderRadius: "4px" }}
                >
                  <h3 className="bg-info">Total :${getTotalPrice()}</h3>
                  <NavLink
                    to={`/checkout`}
                    className="text-decoration-none text-white px-3 text-center py-1 btn btn-info"
                  >
                    Go to Checkout
                  </NavLink>
                </div>
              </div>
            ) : (
              <div>
                <p>No items in the cart</p>
                <div className="pt-4 ps-2 px-2 py-2">
                  {/* <h3 className="bg-info">Total :${getTotalPrice()}</h3> */}
                  <NavLink
                    to={`/products`}
                    className="text-decoration-none text-white px-3 text-center py-1 btn btn-info"
                  >
                    Go to Collections
                  </NavLink>
                </div>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </>
  );
}

export default Sidebar;
