import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../assets/creator.png";
import { Link } from "react-router-dom";

const CreatorSignup = () => {
  return (
    <>
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
                <Form.Label className="font3">Name</Form.Label>
                <Form.Control type="Name" placeholder="Enter Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font3">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="font3">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRepassword">
                <Form.Label className="font3">Re-enter Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSubject">
                <Form.Label className="font3">Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject you have been teaching"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEduaction">
                <Form.Label className="font3">Education</Form.Label>
                <Form.Control type="text" placeholder="Education degree" />
              </Form.Group>

              <Link to="/" className="">
                <Button
                  className="btn btn3 btn-primary"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Link>

              <Form.Group>
                <Form.Label className="font2">
                  Already have account ?
                  <Link to="/login" className="">
                    <Form.Label className="font2 link">&nbsp;Log In</Form.Label>
                  </Link>
                </Form.Label>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreatorSignup;
