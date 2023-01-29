import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../assets/creator.png";
import { Link } from "react-router-dom";
import creator from "../../assets/creator1.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useState } from "react";

const CreatorSignup = () => {
  const captchaRef = useRef(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify(),
      });
    } catch (e) {}
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
              <div class="form-floating mb-3">
                <input
                  type="name"
                  class="form-control"
                  id="floatingName"
                  placeholder="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label for="floatingName">Full Name</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="name"
                  class="form-control"
                  id="floatingEmail"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingEmail">Email Address</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="name"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="name"
                  class="form-control"
                  id="floatingReEnterPassword"
                  placeholder="Password"
                />
                <label for="floatingReEnterPassword">Re-enter password</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="name"
                  class="form-control"
                  id="floatingSubject"
                  placeholder="Subject"
                />
                <label for="floatingSubject">Subject</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="name"
                  class="form-control"
                  id="floatingEducation"
                  placeholder="Education"
                />
                <label for="floatingEducation">Education</label>
              </div>

              <ReCAPTCHA
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                ref={captchaRef}
              />

              <Link to="/" className="">
                <Button
                  className="btn btn-lg btn-primary mb-3"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Link>

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
