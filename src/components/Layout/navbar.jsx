import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Cart/Cart";
import SearchItems from "../Search/SearchIcons";
import "./navbar.css";
import Sidbar from "../sidbar/sidbar";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const NavbarCom = (props) => {
  const isLoggedIn = localStorage.getItem("token");

  const image = localStorage.getItem("image");
  const[dropdownVal,setDropdownVal]=useState(false)

  const dropdownValFun=()=>
  {
    setDropdownVal(!dropdownVal)
  }
  console.log("dropdown :",dropdownVal);
  

 // console.log("image is :", image);
  const logoutFun = () => {
    localStorage.clear();
  };

  return (
    <>
      <Navbar expand="lg" className="bg-info" sticky="top" variant="light">
        <Container fluid>
          {isLoggedIn &&<Sidbar />
          }
         
          <Link className="nav-link  navbar-brand ms-2" to="/">
            My Shopping App
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/products" className="nav-link ">
                Products
              </Link>
              {isLoggedIn ? (
                null
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link">
                    signup
                  </Link>
                </>
              )}
            </Nav>
            <Nav>
              <SearchItems />
              <Sidebar myids={props.ids} className="d-inline pt-1" />
                        { image ? <img
                width={64}
                height={54}
                className=""
                src={image}
                alt="Generic placeholder"
                onClick={dropdownValFun}
              /> :null
            }
            
            </Nav>
          </Navbar.Collapse>
        
        </Container>
      
      </Navbar>
     
     { 
        dropdownVal && <Dropdown.Item href="login" className="text-end px-4 " onClick={logoutFun}>Logout</Dropdown.Item>
     }
   

    </>
  );
};

export default NavbarCom;
