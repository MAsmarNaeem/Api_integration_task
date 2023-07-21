import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../Sizebar/Sidebar";
import SearchItems from "../Search/SearchIcons";
import "./navbar.css";

const NavbarCom = (props) => {
  const isLoggedIn = localStorage.getItem("key");

  const logoutFun = () => {
    localStorage.clear();
  };

  return (
    <>
      <Navbar expand="lg" className="bg-info" sticky="top" variant="light">
        <Container fluid>
          <Link className="nav-link " to="/" class="font">
            My Shopping App
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/ProdctsPage"
                className="nav-link"
                
                style={{ fontSize: "30px" }}
              >
                Products
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={logoutFun}
                  style={{ fontSize: "30px" }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link"
                    style={{ fontSize: "30px" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-link"
                    style={{ fontSize: "30px" }}
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
