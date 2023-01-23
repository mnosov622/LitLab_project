import React from "react";
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
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("success:", res.profileObj);
    // navigate("/");
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const loggedIn = useSelector((state) => state.loggedIn);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          <Col className="form mt-5 ">
            <Form className="mx-auto w-50">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-3">Enter Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-3">Confirm Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  autoFocus
                />
              </Form.Group>
              <Button className="btn btn3 btn-primary btn-lg mb-3" variant="primary" type="submit">Send Link</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
