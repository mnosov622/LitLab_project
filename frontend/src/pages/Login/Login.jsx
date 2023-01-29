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
import { logIn, logInAsCreator, logInAsLearner } from "../../store/actions";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("signed up", state && state?.signedUp);

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

  const handleSubmit = async (e) => {
    setShowLoader(true);
    console.log(email, password);
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.user, data.token);
        if (data.user) localStorage.setItem("token", data.token);
        setNoAccountError(false);
        setWrongCredentials(false);
        if (data?.user?.isLearner) {
          dispatch(logInAsLearner());
          navigate("/");
        } else {
          dispatch(logInAsCreator());
          navigate("/");
        }
      } else if (response.status === 404) {
        console.log("You don't have an acoount");
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
      {signedUp && (
        <p className="fs-5 text-center text-success">
          You have successfully signed up
        </p>
      )}
      <Container>
        <Row className="justify-content-md-center  mx-auto">
          <Col className="form mt-5 ">
            <Form
              className="mx-auto w-50"
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
                />
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
                />
              </Form.Group>
              {wrongCredentials && (
                <div class="text-center text-danger">
                  Wrong Email Or Password
                </div>
              )}
              {noAccountError && (
                <div class="text-center text-danger">
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
              <Button
                className="btn btn3 btn-primary btn-lg mb-3"
                variant="primary"
                type="submit"
              >
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
