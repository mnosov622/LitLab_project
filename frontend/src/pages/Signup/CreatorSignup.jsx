import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../assets/creator.png";
import { Link, useNavigate } from "react-router-dom";
import creator from "../../assets/creator1.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useState } from "react";
import { Bars } from "react-loader-spinner";

const CreatorSignup = () => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [education, setEducation] = useState("");
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
        const response = await fetch("http://localhost:8000/registerCreator", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
            subject,
            education,
            isCreator: true,
          }),
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
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <div>
              <img
                className="mt-5"
                src={creator}
                alt="Login In"
                style={{ width: "30em" }}
              />
            </div>
          </Col>
          <Col className="form mt-5 ">
            <h2 className="fs-2 mb-3">Create an account to get started</h2>
            <Form onSubmit={handleSignup}>
              <div className="form-floating mb-3">
                <input
                  type="name"
                  className="form-control"
                  id="floatingName"
                  placeholder="Name"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label for="floatingName">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="name"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingEmail">Email Address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingReEnterPassword"
                  placeholder="Password"
                  required
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  onKeyUp={handlePasswordMatch}
                />
                <label for="floatingReEnterPassword">Re-enter password</label>
                {!passwordMatch && (
                  <div className="text-danger mt-2">Passwords don't match</div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="name"
                  className="form-control"
                  id="floatingSubject"
                  placeholder="Subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <label for="floatingSubject">Subject</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="name"
                  className="form-control"
                  id="floatingEducation"
                  placeholder="Education"
                  required
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                <label for="floatingEducation">Education</label>
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
                className="btn btn-lg btn-primary mb-3"
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
                <p>
                  Already have account ?
                  <Link to="/login" className="">
                    &nbsp;Log In
                  </Link>
                </p>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreatorSignup;
