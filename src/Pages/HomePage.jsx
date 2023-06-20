//import { AiOutlineUserAdd } from "react-icons/ai";
//import { BsCart } from "react-icons/bs";
import "../App.css";
import Navbar from "../components/navbar";
import products from "../Products/Products.json";
import pic1 from "../../src/Pages/images/pic1.avif";
import pic2 from "../../src/Pages/images/pic2.jpg";
import pic3 from "../../src/Pages/images/pic3.avif";
import pic4 from "../../src/Pages/images/image111.jpg"
import pic5 from "../../src/Pages/images/image112.jpg"
import pic6 from "../../src/Pages/images/image113.jpg"
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
//import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { addvalue } from "../Store/CartSlice";
import { addToCart } from "../Store/AddCartSlice";

function HomePage() {
 
  const[productData,setProductsData]=useState([])
  const dispatch = useDispatch();


  const addCartItem = (id) => {
    const speech = new SpeechSynthesisUtterance('Item added into cart succeesfully'); // Replace with the desired text

    // Configure speech synthesis options
    speech.lang = 'en-US';
    speech.volume = 5;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = speechSynthesis.getVoices().find((voice) => voice.name === 'Google US English'); // Specify the desired voice
    window.speechSynthesis.speak(speech);
   
    dispatch(addToCart(id));
  };
  const opencart = () => {
    dispatch(addvalue(true));
  };
  useEffect(()=>
  {
    getProducts()
  },[])
  const getProducts=async()=>
  {
    try {
      const response=await fetch('//dummyjson.com/products')
      const data=await response.json()
      setProductsData(data.products)

      
    } catch (error) {
      console.log("error is :",error);
      
    }

  }
  console.log("data is :",productData);


  return (
    <div className="container-fluid">
      <Navbar color="bg-info" />

      <div className="row mt-2">
        <div className="col">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic4}
                alt="First slide"
                height={500}
              />
              <Carousel.Caption>
                <h3>Welcome to our Store</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic5}
                alt="Second slide"
                height={500}
              />

              <Carousel.Caption>
                <h3 className="text-info">Best Services Available</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic6}
                alt="Third slide"
                height={500}
              />

              <Carousel.Caption>
                <h3>Quality Products</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col text-center">
          <h3 className="text-white text-bold">Products</h3>
        </div>
      </div>
      <div></div>

      <div className="row">
        {console.log("product is ",productData)}
        {productData.map((myproducts) => (
       
          <div className="col-md-3" key={myproducts.id}>
            <div
              className="card mt-4 shadow"
              style={{ height: "500px", border: "none" }}
            >
              <img
                src={myproducts.thumbnail}
                alt={myproducts.title}
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
                    to={`/Productdetail/${myproducts.id}`}
                    className="text-decoration-none text-danger"
                  >
                    <h5 className="card-title text-info">{myproducts.title}</h5>
                  </NavLink>
                  <p className="card-text">{myproducts.description}</p>
                  <p className="card-text">Price: {myproducts.price}</p>
                </div>
              <button
  className="btn btn-info text-white pb-2 px-4 py-2"
  style={{
    marginLeft: "30%",
    marginRight: "5%",
    marginBottom: "30px",
    width: "40%",
    maxWidth: "300px"
  }}
  type="button"
  onClick={() => {
    addCartItem(myproducts.id);
    opencart();
  }}
>
  Add to Cart
</button>

              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
