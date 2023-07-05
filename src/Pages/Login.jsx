import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UseLogin from "../customHooks/UseLogin";
import "../App.css";

import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";

function Login() {
  const { getdata, submitbutton, error } = UseLogin();

  return (
    <div>
      <Navbar />
      <Container>
        <Row className=" justify-content-center">
          <Col md={6} className="mt-4">
            <h2 className="text-center mb-4">Log In</h2>
            <Form method="post" onSubmit={submitbutton}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={getdata}
                  name="email"
                />
              </Form.Group>
              <Form.Text className="text-danger">
                { error.email !== undefined && error.email && error.email}
                </Form.Text>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={getdata}
                  name="password"
                />
              </Form.Group>
              <Form.Text className="text-danger">
                { error.password !== undefined && error.password && error.password}
                </Form.Text>

              <Button variant="info" type="submit" className="w-100 mt-3">
                Log In
              </Button>
              <p className="mt-4">
                <h3>
                  Do not have account{" "}
                  <span>
                    <NavLink to="/signup">SignUp</NavLink>
                  </span>
                </h3>{" "}
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
