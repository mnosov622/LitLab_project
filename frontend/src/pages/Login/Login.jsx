import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import login from "../../assets/login.png";

const Login = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          {/* <Col>
            <div className="mt-5 d-flex justify-content-center align-items-center">
              <img
                className=""
                src={login}
                alt="Login In"
                style={{ width: "20em" }}
              />
            </div>
          </Col> */}
          <Col className="form mt-5 ">
            <Form className="mx-auto w-50">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-3">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fs-3">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Link to="/forgot-password" className="text-muted">
                  Forgot Password?
                </Link>
              </Form.Group>
              <Button
                className="btn btn3 btn-primary btn-lg mb-3"
                variant="primary"
                type="submit"
              >
                Log In
              </Button>
              <p>
                New to LitLab ?<Link to="/signup"> Sign Up</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
