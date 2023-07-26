import React, { useState, useEffect } from "react";
import "./SearchIcon.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";


const SearchItems = () => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [productData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, seterror] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const showInputField = () => {
    setToggle(true);
  };

  const hideInputField = () => {
    setToggle(false);
    setText("");
  };

  const getValue = (e) => {
    setText(e.target.value);
  };

  const getSearchApi = async () => {
    try {
      if (text.length >= 3) {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/search?q=${text}`
        );

        const dataSearch = await response.json();

        if (dataSearch.products.length === null) {
          setProductsData(["Not Item Found"]);
        } else {
          setProductsData(dataSearch.products);
        }
      } else {
        setProductsData([]);
      }
    } catch (error) {
      seterror(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      // Fetch categories from the API and set them to the state
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/categories`
      );
      const dataSearch = await response.json();
      setCategories(dataSearch);
    } catch (error) {
      seterror(error);
    }
  };

  const getCategorytype = async () => {
    try {
      if (!selectedOption) {
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/category/${selectedOption}`
      );

      const dataSearch = await response.json();

      if (dataSearch.products.length === 0) {
        setProductsData(["Not Item Found"]);
      } else {
        setProductsData(dataSearch.products);
      }
    } catch (error) {
      seterror(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getSearchApi();
    // eslint-disable-next-line
  }, [text]);

  useEffect(() => {
    getCategorytype();
    // eslint-disable-next-line
  }, [selectedOption]);

  return (
    <>
      <div onClick={showInputField} className="nav-link  ">
        <div className="styling-border pl-4 ">
        <Form.Control
          type="text"
          placeholder="Search"
          className="mr-sm-2 rounded-5 px-2.8 padd  "
          onChange={getValue}
          value={text}
        />
      </div>
      </div>
      <div className="custom-position">
        {text.length >= 3 && toggle && (
          <div className="responsive-searchdiv rounded-5">
            <div
             
              className="d-inline p-2 CssSearch"
            >
              <Row>
              <div className="row">
                <div className="col-md-3 d-flex ">
                  <ul className="list-styling">
                    <h3>Categories</h3>
                    {categories.map((category) => (
                      <li key={category}>
                        <label>
                          <input
                            type="radio"
                            value={category}
                            checked={selectedOption === category}
                            onChange={handleOptionChange}
                          />
                          <p className="d-inline ms-2">{category}</p>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-9 d-inline">
                  <p
                    className="text-end text-danger iconcursor "
                    onClick={hideInputField}
                    style={{paddingRight:"40px"}}
                  >
                    X
                  </p>
                  <div>
                    <Link to="/products" className="ex1 bordered">
                      show All Products
                    </Link>
                  </div>
                
                  <div className="products-container ">
                    {loading ? (
                      <p>Loading...</p>
                    ) : productData.length === 0 ? (
                      <p>No item found</p>
                    ) : (
                      productData.map((product) => (
                        <NavLink
                          to={`/Product/${product.id}`}
                          className="text-decoration-none text-danger"
                          key={product.id}
                        >
                          <div className="product">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              height="80px"
                            />
                            <h5>{product.title}</h5>
                            <p>Price: {product.price}</p>
                          </div>
                        </NavLink>
                      ))
                    )}
                  </div>
                </div>
              </div>
              </Row>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchItems;
