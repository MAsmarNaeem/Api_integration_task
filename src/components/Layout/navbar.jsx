import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import SearchItems from "../Search/SearchIcons";
import "./navbar.css";

const NavbarCom = (props) => {
  const isLoggedIn = localStorage.getItem("token");

  const logoutFun = () => {
    localStorage.clear();
  };

  return (
    <>
      <Navbar expand="lg" className="bg-info" sticky="top" variant="light" >
        <Container fluid>
          <Link className="nav-link " to="/" >
            My Shopping App
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/products"
             
                className="nav-link "               
             
              >
                Products
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={logoutFun}
               
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link"
                   
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-link"
                  
                  >
                    signup
                  </Link>
                </>
              )}

              <SearchItems />
            </Nav>
            <Nav>
              <Sidebar myids={props.ids} className="d-inline" />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCom;
