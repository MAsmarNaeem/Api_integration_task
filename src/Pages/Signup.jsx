import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";

import "../App.css"

function Signup() {
  // const { getUserData } = UseSignup();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    
  });

  // name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",

   const [userData, setUserData] = useState([]);

  const [signupInputs, setSignupInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setSignupInputs(() => {
      return {
        ...signupInputs,
        [name]: value,
      };
    });
  };



   const addDataButton = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupInputs;

     if (name === "") {
      setErrors({name: 'Name field is required'})
      // alert("name field is required");
     }
    //  else if (email === "") {
    //   alert("email field is required");
    // } else if (password === "") {
    //   alert("password field is required");
    // } else if (confirmPassword === "") {
    //   alert("confirm Password field is required"); //Confrirm password must match with password
    // } else if (password !== confirmPassword) {
    //   alert("Password and confirm Password should be same"); // Password and confirm password must match
    // } else if (!email.includes("@")) {
    //   alert(" Enter valid Email");
    // } else if (password.length < 5) {
    //   alert("Enter Password strong or greater than 5 digits "); //Your password length must be greater than 5
    //  }
     console.log(errors.name);
     if (!errors) {
        navigate("/login")
        alert("Enter data successfully");
       }else {
      // alert("Enter data successfully"); // The account has been created successfully.
      // localStorage.setItem("key", JSON.stringify([...userData, signupInputs]));
      // dompush("/Login");
    }
  };

  return (
   <div >
    <Navbar/>
     <Container>
      <Row className="justify-content-center" >
        <Col md={6} className="mt-4">
          <h2 className="text-center mb-4">Create an Account</h2>
          <Form method="post" onSubmit={addDataButton}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                required
                onChange={ handleChange}
                />
                <Form.Text className="text-danger">
                { errors.name !== undefined && errors.name && errors.name}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                onChange={ handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={ handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={ handleChange}
                name="confirmPassword"

                required
              />
              </Form.Group>
              
              {/* onClick={addDataButton} */}
            <Button variant="info" type="submit" className="w-100 mt-3" >
              Sign Up
            </Button>

          </Form>
          <p className="mt-4">Already have a account  <span><NavLink to="/Login">Login</NavLink></span></p>
        </Col>
      </Row>
    </Container>
   </div>
  );
}

export default Signup;