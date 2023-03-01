import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import login from "../../assets/login.png";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {});

  const handleSubmit = (e) => {
    const email = emailRef.current.value;
    console.log("email", emailRef.current.value);

    e.preventDefault();
    fetch("http://localhost:8000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          <Col className="form mt-5 ">
            <p className="text-center fs-2">
              You will recieve a link to reset password
            </p>
            <Form className="mx-auto w-50" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-4">Enter Email</Form.Label>
                <Form.Control type="email" placeholder="Email" autoFocus ref={emailRef}/>
              </Form.Group>
              <Button
                className="btn btn3 btn-primary btn-lg mb-3"
                variant="primary"
                type="submit"
              >
                Send Link
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
