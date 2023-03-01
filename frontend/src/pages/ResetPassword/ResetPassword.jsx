import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation } from "react-router-dom";
import login from "../../assets/login.png";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/actions";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  //Getting token from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("success:", res.profileObj);
    // navigate("/");
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  useEffect(() => {
    if(localStorage.getItem("resettingPassword")) {
      console.log("exists");
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password, token);
    console.log("Form is submitted");
    fetch('http://localhost:8000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })
    .then(res => console.log("response", res));
  
   
  }


  return (
    <>
    <h2 className="text-center text-primary mt-4">Reset your password</h2>
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          <Col className="form m2-">
            <Form className="mx-auto w-50" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fs-3">New Password</Form.Label>
                <Form.Control type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fs-3">Re-enter Password</Form.Label>
                <Form.Control type="password" placeholder="Renter Password" />
              </Form.Group>
              <Button className="btn btn3 btn-primary btn-lg mb-3" variant="primary" type="submit">Reset Password</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
