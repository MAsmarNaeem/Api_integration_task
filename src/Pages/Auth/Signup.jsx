import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UseSignup from "../../customHooks/UseSignup";
import { NavLink } from "react-router-dom";

import Navbar from "../../components/Layout/navbar";

import "./Login.css"

function Signup() {
  const { getUserData, addDataButton,error } = UseSignup();

  return (
   <div >
    <Navbar/>
     <Container>
      <Row className="justify-content-center " >
        <Col md={6} >
          <h2 className="text-center mb-4 mt-5">Create an Account</h2>
          <Form method="post" onSubmit={addDataButton}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                required
                onChange={ getUserData}
              />
            </Form.Group>
            <Form.Text className="text-danger">
                { error.name !== undefined && error.name && error.name}
                </Form.Text>
          

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                onChange={ getUserData}
              />
                <Form.Text className="text-danger">
                { error.email !== undefined && error.email && error.email}
                </Form.Text>
               
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
                onChange={ getUserData}
              />
            </Form.Group>
            <Form.Text className="text-danger">
                { error.password !== undefined && error.password && error.password}
                </Form.Text>
            

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={ getUserData}
                name="confirmPassword"

                required
              />
            </Form.Group>
            <Form.Text className="text-danger">
                { error.confirmpassword !== undefined && error.confirmpassword && error.confirmpassword}
                </Form.Text>

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