import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Cart/Cart";
import SearchItems from "../Search/SearchIcons";
import "./navbar.css";
import Sidbar from "../sidbar/sidbar";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const NavbarCom = (props) => {
  const isLoggedIn = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const id = localStorage.getItem("id");
  // const [dropdownVal, setDropdownVal] = useState(false);
  const [show, setShow] = useState(false);
  const [Alert, setShowAlert] = useState(false);
  const [logindata, setLoginData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getUserData();
    setShowAlert(false);
    setShow(true);
  };

  // const dropdownValFun = () => {
  //   setDropdownVal(!dropdownVal);
  // };

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      const userData = response.data;

      setLoginData({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateUserProfile = () => {
    setShowAlert(true);
    const { email, firstName, lastName, age } = logindata;
    axios
      .put(`https://dummyjson.com/users/${id}`, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
      })
      .then((response) => {
        console.log("name is :", response.data.firstName);
        console.log("last is :", response.data.lastName);
        console.log("age is :", response.data.age);
        console.log("email is :", response.data.email);

        if (response.status === 200) {
          // handleClose();
        }
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  const logoutFun = () => {
    localStorage.clear();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-info" sticky="top" variant="light">
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
                      style={{ borderRadius: "50px", backgroundColor: "white" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu dropdown-menu-end">
                    <Dropdown.Item className="cursor" onClick={handleShow}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="login"
                      className="cursor"
                      onClick={logoutFun}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          {Alert && (
            <div className="alert  bg-success text-white mt-7" role="alert">
              Data is updated Successfully
            </div>
          )}
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mian"
                  autoFocus
                  name="firstName"
                  value={logindata.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mian"
                  autoFocus
                  name="lastName"
                  value={logindata.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  name="email"
                  value={logindata.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="20"
                  autoFocus
                  name="age"
                  value={logindata.age}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="pointer_css"  onClick={updateUserProfile}> 
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default NavbarCom;
