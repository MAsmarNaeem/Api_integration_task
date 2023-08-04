import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

const UserProfileModal = (props) => {
  const [show, setShow] = useState(props.show);
  const [showAlert, setShowAlert] = useState(false);
  const [logindata, setLoginData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "", 
  });

  const [showSpinner, setShowSpinner] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getUserData();
    setShowAlert(false);
    setShow(true);
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${props.id}`);
      const userData = response.data;

      setLoginData({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        gender: userData.gender,
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
    setShowSpinner(true);
    const { email, firstName, lastName, age, gender } = logindata; 
    axios
      .put(`https://dummyjson.com/users/${props.id}`, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
      })
      .then((response) => {
        console.log("name is :", response.data.firstName);
        console.log("last is :", response.data.lastName);
        console.log("age is :", response.data.age);
        console.log("email is :", response.data.email);
        console.log("user gender is :", response.data.gender);

        if (response.status === 200) {
          setTimeout(() => {
            setShowSpinner(false);
          }, 300);
        }
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <>
        <Dropdown.Item className="cursor" onClick={handleShow}>
          {props.name}
        </Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          {showAlert && (
            <>
              <Alert key="success" variant="success">
                Updated Data successfully
              </Alert>
            </>
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
              <Form.Check
                type="radio"
                aria-label="radio 1"
                name="gender"
                value="male"
                checked={logindata.gender === "male"}
                onChange={handleInputChange}
                className="d-inline"
              />{" "}
              Male
              <Form.Check
                type="radio"
                aria-label="radio 1"
                name="gender"
                value="female"
                checked={logindata.gender === "female"}
                onChange={handleInputChange}
                className="d-inline ms-3"
              />{" "}
              Female
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserProfile}>
              Save Changes
              {showSpinner ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: "5px" }}
                />
              ) : null}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default UserProfileModal;
