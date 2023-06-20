import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UseSignup from "../customHooks/UseSignup";
import { NavLink } from "react-router-dom";

import Navbar from "../components/navbar";

import "../App.css"

function Signup() {
  const { getUserData, addDataButton } = UseSignup();

  return (
   <div >
    <Navbar/>
     <Container>
      <Row className="justify-content-center" >
        <Col md={6} className="mt-4">
          <h2 className="text-center mb-4">Create an Account</h2>
          <Form>
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

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                onChange={ getUserData}
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
                onChange={ getUserData}
              />
            </Form.Group>

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

            <Button variant="info" type="submit" className="w-100 mt-3" onClick={addDataButton}>
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