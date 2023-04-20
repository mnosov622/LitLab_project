import React, { useState } from "react";
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
import { logIn, loginAsAdmin, logInAsCreator, logInAsLearner } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { Bars, Oval } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noAccountError, setNoAccountError] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const loggedInAsLearner = useSelector((state) => state.loggedInAsLearner);
  const loggedInAsCreator = useSelector((state) => state.creatorLogin);
  const [showLoader, setShowLoader] = useState(false);
  const [uknownError, setUnknownError] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const location = useLocation();

  // Define a function to validate the email input field
  function handleEmail() {
    // Ensure the email is not empty
    if (email == null) {
      return setEmailError("Email cannot be empty.");
    }

    // Ensure the email is in a valid format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setEmailError("Email must be in a valid format.");
    }

    // If all checks pass, return null to indicate success
    return setEmailError(null);
  }

  // Define a function to validate the password input field
  function handlePassword() {
    // Ensure the password is not empty
    if (password == null) {
      return setPasswordError("Password cannot be empty.");
    }

    // Ensure the password is at least 8 characters long
    if (password.length < 8) {
      return setPasswordError("Password must be at least 8 characters long.");
    }

    // If all checks pass, return null to indicate success
    return setPasswordError(null);
  }

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!state?.loggedIn) {
    //   setUserLoggedIn(false);
    // }
    if (state?.success) {
      setSignedUp(true);
    }
  }, []);

  const onSuccess = async (res) => {
    setShowLoader(true);

    try {
      const response = await fetch("http://localhost:8000/googleLogin", {
        method: "POST",
        body: JSON.stringify({
          email: res.profileObj.email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("lastVisit", data.dateString);
        if (data.user) {
          localStorage.setItem("token", data.token);
        }
        setNoAccountError(false);
        setWrongCredentials(false);
        if (data?.user?.isLearner) {
          dispatch(logInAsLearner());
          localStorage.setItem("lastVisit", data.dateString);
          navigate("/all-courses");
        } else {
          dispatch(logInAsCreator());
          navigate("/");
        }
      } else if (response.status === 404) {
        setNoAccountError(true);
        setWrongCredentials(false);
      } else {
        setWrongCredentials(true);
        setNoAccountError(false);
      }
    } catch (error) {
      console.error("There has been an error, try again", error);
    }

    setShowLoader(false);
  };
  const onFailure = (err) => {};

  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

  const handleSubmit = async (e) => {
    setShowLoader(true);
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("lastVisit", data.dateString);
        }
        setNoAccountError(false);
        setWrongCredentials(false);
        if (data?.user?.isLearner) {
          dispatch(logInAsLearner());
          navigate("/all-courses");
        } else if (data?.user?.isCreator) {
          dispatch(logInAsCreator());
          navigate("/");
        } else {
          dispatch(loginAsAdmin());
          navigate("/");
        }
      } else if (response.status === 404) {
        setNoAccountError(true);
        setWrongCredentials(false);
      } else {
        setWrongCredentials(true);
        setNoAccountError(false);
      }
    } catch (error) {
      console.error("There has been an error, try again", error);
    }

    setShowLoader(false);
  };
  return (
    <>
      {signedUp && <p className="fs-5 text-center text-success">You have successfully signed up</p>}

      {location.state && location.state.message && <p>{location.state.message}</p>}
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          <Col className="form mt-5 ">
            <Form
              className="mx-auto w-50 login"
              action="/login"
              method="POST"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-3">Email address</Form.Label>
                <input
                  type="email"
                  placeholder="Enter email"
                  autoFocus
                  name="email"
                  value={email}
                  className="form-control"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={handleEmail}
                />
                {emailError && <div className="text-danger mt-2">{emailError}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fs-3">Password</Form.Label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handlePassword}
                />
                {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
              </Form.Group>
              {wrongCredentials && (
                <div className="text-center text-danger">Wrong Email Or Password</div>
              )}
              {noAccountError && (
                <div className="text-center text-danger">
                  You don't have an account,{" "}
                  <Link to="/signup" className="text-decoration-underline">
                    create it
                  </Link>{" "}
                  first
                </div>
              )}

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Link to="/forgot-password" className="text-muted">
                  Forgot Password?
                </Link>
              </Form.Group>
              <Button className="btn btn3 btn-primary btn-lg mb-3" variant="primary" type="submit">
                {showLoader ? (
                  <Bars
                    height="30"
                    width="55"
                    color="#fff"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  <span>Sign in</span>
                )}
              </Button>

              <p className="fs-3 ml-5">or</p>
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={false}
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
