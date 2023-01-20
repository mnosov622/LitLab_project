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
import { useSelector } from "react-redux";

const Login = () => {
  const onSuccess = (res) => {
    console.log("success:", res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  //TODO: Add client ID from google cloud
  const clientId = "1234";

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
                Sign in
              </Button>

              <p className="fs-3 ml-5">or</p>
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                className="mb-3"
              />

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
