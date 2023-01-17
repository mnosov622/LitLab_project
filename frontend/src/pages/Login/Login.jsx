import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../assets/signin.jpg";
import { Link } from "react-router-dom";
import styles from "./styles-login.scss";

const Login = () => {
  return (
    <>
      <div className="borber" style={styles}>
        <Container>
          <Row className="justify-content-md-center" style={{ styles }}>
            <Col>
              <div>
                <img
                  className="img"
                  src={img}
                  alt="Login In"
                  style={{ width: "500px" }}
                />
              </div>
            </Col>
            <Col className="form">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fonts">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fonts">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Link to="/" className="">
                    <Form.Label className="font1">Forgot Password?</Form.Label>
                  </Link>
                </Form.Group>
                <Button
                  className="btn btn3 btn-primary btn-lg"
                  variant="primary"
                  type="submit"
                >
                  Log In
                </Button>
                <Form.Group>
                  <Form.Label className="font2">
                    New to LitLab ?
                    <Form.Label className="font2 link ">
                      &nbsp;Sign Up
                    </Form.Label>
                  </Form.Label>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
