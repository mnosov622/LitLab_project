import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../assets/learner.png";
import { Link } from "react-router-dom";
// import styles from "./styles-login.scss"

const LearnerSignup = () => {
  return (
    <>
      <div className="borber">
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <div>
                <img
                  className="img"
                  src={img}
                  alt="Login In"
                  style={{ width: "650px" }}
                />
              </div>
            </Col>
            <Col className="form">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="fonts">Full Name</Form.Label>
                  <Form.Control type="Name" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fonts">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fonts">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRepassword">
                  <Form.Label className="fonts">Re-enter Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button
                  className="btn btn3 btn-primary btn-lg"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
                </Button>

                <Form.Group>
                  <Form.Label className="font2">
                    Already have account ?
                    <Link to="/login" className="">
                      <Form.Label className="font2 link">
                        &nbsp;Log In
                      </Form.Label>
                    </Link>
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

export default LearnerSignup;
