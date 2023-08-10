import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Cart/Cart";
import SearchItems from "../Search/SearchIcons";
import "./navbar.css";
import Sidbar from "../sidbar/sidbar";
import Dropdown from "react-bootstrap/Dropdown";

import UserProfileModal from "../userProfileModal/userProfileModel";
import { useSelector } from "react-redux";
import { removeval } from "../../Store/UpdateNavbar";
import { useDispatch } from "react-redux";

const NavbarCom = (props) => {
  const store = useSelector((store) => store);
  console.log("store is :",store.UpdateNavbar.Nav.data);
  const isLoggedIn = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const id = localStorage.getItem("id");
  //const store = useSelector((store) => store);
  const dispatch=useDispatch()

  const logoutFun = () => {
    dispatch(removeval(""))
   
   // dispatch(UpdateNav(response.data.token))
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-info"
        id="header"
        sticky="top"
        variant="light"
      >
        <Container fluid>
          {isLoggedIn && <Sidbar />}
          <Link className="nav-link  navbar-brand ms-2" to="/">
            My Shopping App
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/products" className="nav-link ">
                Products
              </Link>
              {isLoggedIn ? null : (
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
              {isLoggedIn ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-basic icon-border"
                    style={{ border: "white" }}
                  >
                    <img
                      width={30}
                      height={31}
                      src={image}
                      alt="Wait"
                      className="dropdown-radius mt-2"
                      style={{
                        borderRadius: "50px",
                        backgroundColor: "white",
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="custom-dropdown-menu dropdown-menu-end">
                    <UserProfileModal id={id} name="Profile" />
                    <Dropdown.Item>
                      <Link to="login" className="cursor text-decoration-none text-black" onClick={logoutFun}>
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCom;
