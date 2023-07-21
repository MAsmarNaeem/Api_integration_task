// Import necessary modules and dependencies

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UseLogin from "../customHooks/UseLogin";
import "../App.css";
import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";
import "../App.css";

function Login() {
  const { getdata, submitbutton, error, logindata } = UseLogin();

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-center d-flex pt-5 mt-5">
          <Col md={7} className="mt-4 login-container">
            <h1 className="login-heading" style={{fontSize:"60px"}}>   Log In</h1>
            <Form method="post" onSubmit={submitbutton} className="login-form">
              <Form.Group controlId="formBasicEmail"  className="textcss">
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control
                  type="text "
                 
                  placeholder="Enter username"
                  required
                  onChange={getdata}
                  value={logindata.email}
                  name="email"
                  style={{borderBottom:"red",}}
                />
              </Form.Group>
              <Form.Text className="error-text">
                {error.email !== undefined && error.email && error.email}
              </Form.Text>

              <Form.Group controlId="formBasicPassword"  className="textcss">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={getdata}
                  name="password"
                  value={logindata.password}
                />
              </Form.Group>
              <Form.Text className="error-text">
                {error.password !== undefined &&
                  error.password &&
                  error.password}
              </Form.Text>

              <Button variant="info" type="submit" className="mt-3">
                Log In
              </Button>
              <p className="mt-4 login-footer" style={{fontSize:"20px"}}>
                Do not have an account{" "}
                <span>
                  <NavLink to="/signup">Sign Up</NavLink>
                </span>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
