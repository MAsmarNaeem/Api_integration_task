
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UseLogin from "../../customHooks/UseLogin";
import { NavLink } from "react-router-dom";

import  "./Login.css"
import Alert from 'react-bootstrap/Alert';
import NavbarCom from "../../components/Layout/navbar";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const { getdata, submitbutton, error, logindata,showSpinner } = UseLogin();

  return (
    <div>
      <NavbarCom/>
      <Container>
        <Row className="justify-content-center d-flex text-center">
          <Col md={7} className="mt-4 login-container">
      
            <h1 className="login-heading " style={{fontSize:"60px"}}>  Log In</h1>
            { error.Error && <Alert variant="danger" className="w-50 alertCss" >{error.Error}</Alert>}
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
