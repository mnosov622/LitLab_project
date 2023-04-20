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
import { useAlert, positions } from "react-alert";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);

  const alert = useAlert();

  //Getting token from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    setEmptyPassword(false);
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else if (password === confirmPassword) {
      setPasswordMatch(true);
    }
    if (password.length >= 8 || confirmPassword.length >= 8) {
      setShortPassword(false);
    }
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length === 0) {
      setEmptyPassword(true);
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      setShortPassword(true);
    }

    if (passwordMatch && password.length >= 8 && confirmPassword.length >= 8) {
      setShortPassword(false);
      localStorage.removeItem("resettingPassword");

      fetch("http:/localhost:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }).then((res) => {
        if (res.status === 400) {
          alert.error("Reset password link has expired. Send new reset password request.", {
            position: positions.BOTTOM_CENTER,
            timeout: 5000, // custom timeout just for this one alert
          });
        }
        if (res.status === 200) {
          alert.success("You have successfully changed your password", {
            position: positions.BOTTOM_CENTER,
            timeout: 5000, // custom timeout just for this one alert
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
    }
  };

  return (
    <>
      <h2 className="text-center text-primary mt-4">Reset your password</h2>
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          <Col className="form m2-">
            <Form className="mx-auto w-50" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label className="fs-3">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNewReenterPassword">
                <Form.Label className="fs-3">Re-enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Renter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!passwordMatch && <p className="text-danger mt-2">Passwords don't match</p>}
                {emptyPassword && <p className="text-danger mt-2">Password can't be empty</p>}
                {shortPassword && (
                  <p className="text-danger mt-2">Password must be at least 8 characters long.</p>
                )}
              </Form.Group>
              <Button className="btn btn3 btn-primary btn-lg mb-3" variant="primary" type="submit">
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
