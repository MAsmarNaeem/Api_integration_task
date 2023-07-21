import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "../components/Products/SearchIcon.css";
import { NavLink } from "react-router-dom";



const SearchItems = () => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [textSubmit, setTextSubmit] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [productData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[error,seterror]=useState("")


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const showInputField = () => {
    setToggle(!toggle);
  };

  const getValue = (e) => {
    setText(e.target.value);
  };

  const submitButtonSearch = () => {
    setTextSubmit(text);
  };

  const getCategory = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/categories`);
      const dataSearch = await response.json();
      setCategories(dataSearch);
    } catch (error) {
    
      seterror(error)
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
    seterror(error)
    } finally {
      setLoading(false);
    }
  };

 


  const getSearchApi = async () => {
    try {
      if (!textSubmit) {
        setProductsData([]);
        return;
      }

      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/search?q=${textSubmit}`
      );

      const dataSearch = await response.json();

      if (dataSearch.products.length === 0) {
        setProductsData(["Not Item Found"]);
      } else {
        setProductsData(dataSearch.products);
      }
    } catch (error) {
     
      seterror(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getSearchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSubmit]);

  useEffect(() => {
    getCategorytype();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]); // Disable ESLint warning for this line

  return (
    <div style={{ position: "relative" }}>
      <span onClick={showInputField}>
      
        <BsSearch style={{ width: "30px", height: "60px", color: "white" }} />
       
      </span>

      {toggle && (
        <div>
           <p>{error}</p>
          <div
            style={{
              position: "fixed",
              top: 60,
              right: 650,
              zIndex: 10,
            }}
            className="d-inline p-2 CssSearch"
          >
            <input
              type="text"
              placeholder="Search"
              className="form-control d-inline inputfield"
              style={{ width: "240px" }}
              onChange={getValue}
              value={text}
            />

            <BsSearch onClick={submitButtonSearch} style={{ height: "50px", width: "30px" }} />

            <br />
          </div>
          <div></div>
          <div
            style={{
              position: "fixed",
              top: 125,
              right: 650,
              zIndex: 10,
              width: "1100px",
              height: "500px",
            }}
            className="d-inline p-2 CssSearch"
          >
            <div></div>
            <div className="row">
              <div className="col-md-4">
                <ul style={{ listStyle: "none", marginLeft: "-30px" }}>
                  {categories.map((category) => (
                    <li key={category} style={{ color: "black" }}>
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
              <div className="col-md-8">
                <div className="products-container">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    productData.map((product) => (
                      <NavLink
                        to={`/Productdetail/${product.id}`}
                        className="text-decoration-none text-danger"
                        key={product.id}
                      >
                        <div className="product">
                          <img src={product.images[0]} alt={product.title} height="70px" />
                          <h5>{product.title}</h5>
                          <p>Price: {product.price}</p>
                        </div>
                      </NavLink>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchItems;
