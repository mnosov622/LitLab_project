import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles-login.scss"
import student from "../../assets/student.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useState } from "react";
import { Bars, Oval } from "react-loader-spinner";

const LearnerSignup = () => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordMatch = () => {
    if (password !== reEnterPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSignup = async (e) => {
    setShowLoader(true);
    e.preventDefault();
    if (passwordMatch) {
      try {
        const response = await fetch("http://localhost:8000/registerLearner", {
          method: "POST",
          body: JSON.stringify({ name, email, password, isLearner: true }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(response);
        if (response.status === 200) {
          navigate("/login");
          setUserExists(false);
        } else if (response.status === 409) {
          setUserExists(true);
        }
      } catch (e) {
        console.log("Unknown error", e);
      }
    }
    setShowLoader(false);
  };

  return (
    <>
      <div className="mt-5">
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <div>
                <img
                  className="img"
                  src={student}
                  alt="Login In"
                  style={{ width: "30em" }}
                />
              </div>
            </Col>
            <Col className="form mt-5">
              <h2 className="mb-3 fs-2">Create an account to get started</h2>
              <Form onSubmit={handleSignup}>
                <div class="form-floating mb-3">
                  <input
                    type="name"
                    class="form-control"
                    id="floatingName"
                    placeholder="name@example.com"
                    autoFocus
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label for="floatingName">Full Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingEmail"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUserExists(false);
                    }}
                  />
                  <label for="floatingEmail">Email Address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingReEnterPassword"
                    placeholder="Password"
                    required
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    onKeyUp={handlePasswordMatch}
                  />
                  <label for="floatingReEnterPassword">Re-enter password</label>
                  {!passwordMatch && (
                    <div className="text-danger mt-2">
                      Passwords don't match
                    </div>
                  )}
                </div>
                {userExists && (
                  <div className="text-danger">
                    User with this email already exists
                  </div>
                )}
                <ReCAPTCHA
                  className="mt-2 mb-2"
                  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                  ref={captchaRef}
                />

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
                    <span>Sign Up</span>
                  )}
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
