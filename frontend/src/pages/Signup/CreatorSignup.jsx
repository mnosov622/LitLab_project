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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [education, setEducation] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Define state variables for the input values and validation errors
  const [fnameError, setFNameError] = useState(null);
  const [lnameError, setLNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [subjectError, setSubjectError] = useState(null);
  const [eduError, setEduError] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);

  const handlePasswordMatch = () => {
    if (password !== reEnterPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };
  const handleFirstName = () => {
    if (firstName == null) {
      return setFNameError("Name cannot be empty.");
    }

    // Ensure the name is not too short or too long
    if (firstName.length < 2 || firstName.length > 50) {
      return setFNameError("Name must be between 2 and 50 characters.");
    }

    // Ensure the name contains only valid characters
    if (!/^[a-zA-Z\s]*$/.test(firstName)) {
      return setFNameError("Name can only contain letters and spaces.");
    }

    // If all checks pass, return null to indicate success
    return setFNameError(null);
  };

  const handleLastName = (e) => {
    if (lastName == null) {
      return setLNameError("Name cannot be empty.");
    }

    // Ensure the name is not too short or too long
    if (lastName.length < 2 || lastName.length > 50) {
      return setLNameError("Name must be between 2 and 50 characters.");
    }

    // Ensure the name contains only valid characters
    if (!/^[a-zA-Z\s]*$/.test(lastName)) {
      return setLNameError("Name can only contain letters and spaces.");
    }

    // If all checks pass, return null to indicate success
    return setLNameError(null);
  };

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

  function handlePassword() {
    // Ensure the password is not empty
    if (password == null) {
      return setPasswordError("Password cannot be empty.");
    }

    // Ensure the password has at least one capital letter, one number, and one special symbol
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasCapital || !hasNumber || !hasSpecialSymbol) {
      return setPasswordError(
        "Password must contain at least one capital letter, one number, and one special symbol."
      );
    }

    // Ensure the password is at least 8 characters long
    if (password.length < 8) {
      return setPasswordError("Password must be at least 8 characters long.");
    }
    // If all checks pass, return null to indicate success
    return setPasswordError(null);
  }

  function handleSubject() {
    // Ensure the subject contains only valid characters
    if (!/^[a-zA-Z\s]*$/.test(subject)) {
      return setSubjectError("Subject can only contain letters and spaces.");
    }
    return setSubjectError(null);
  }

  function handleEdu() {
    // Ensure the subject contains only valid characters
    if (!/^[a-zA-Z\s]*$/.test(education)) {
      return setEduError("Education can only contain letters and spaces.");
    }
    return setEduError(null);
  }

  const handleSignup = async (e) => {
    setShowLoader(true);
    e.preventDefault();

    const recaptchaResponse = captchaRef.current.getValue();

    const url = "https://litlab-backend-v2.vercel.app/validate-recaptcha";
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recaptchaResponse }),
    });
    const result = await response.json();
    if (!result.success) {
      setCaptchaError(true);
      setShowLoader(false);
      captchaRef.current.reset();
    } else {
      setCaptchaError(false);
      setShowLoader(false);
    }

    if (passwordMatch && result.success && !passwordError) {
      try {
        const fullName = `${firstName} ${lastName}`;

        const response = await fetch("https://litlab-backend-v2.vercel.app/registerCreator", {
          method: "POST",
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            subject,
            education,
            isCreator: true,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          navigate("/login");
          setUserExists(false);
        } else if (response.status === 409) {
          setUserExists(true);
        }
      } catch (e) {}
    }
    setShowLoader(false);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <div>
              <img className="mt-5" src={creator} alt="Login In" style={{ width: "30em" }} />
            </div>
          </Col>
          <Col className="form mt-5 ">
            <h2 className="fs-2 mb-3">Create an account to get started</h2>
            <Form onSubmit={handleSignup}>
              <Row className="justify-content-md-center">
                <Col>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingFName"
                      placeholder="Name"
                      required
                      autoFocus
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyUp={handleFirstName}
                    />
                    <label htmlFor="floatingFName">First Name</label>
                    {fnameError && <div className="text-danger mt-2">{fnameError}</div>}
                  </div>
                </Col>
                <Col>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingLName"
                      placeholder="Last Name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyUp={handleLastName}
                    />
                    <label htmlFor="floatingLName">Last Name</label>
                    {lnameError && <div className="text-danger mt-2">{lnameError}</div>}
                  </div>
                </Col>
              </Row>
              <div className="form-floating mb-3">
                <input
                  type="name"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={handleEmail}
                />
                <label for="floatingEmail">Email Address</label>
                {emailError && <div className="text-danger mt-2">{emailError}</div>}
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
                  onKeyUp={handlePassword}
                />
                <label for="floatingPassword">Password</label>
                {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
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
                {!passwordMatch && <div className="text-danger mt-2">Passwords don't match</div>}
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
                  onKeyUp={handleSubject}
                />
                <label for="floatingSubject">Subject</label>
                {subjectError && <div className="text-danger mt-2">{subjectError}</div>}
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
                  onKeyUp={handleEdu}
                />
                <label for="floatingEducation">Education</label>
                {eduError && <div className="text-danger mt-2">{eduError}</div>}
              </div>

              {userExists && <div className="text-danger">User with this email already exists</div>}
              <ReCAPTCHA
                className="mt-2 mb-2"
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                ref={captchaRef}
              />
              {captchaError && <p className="text-danger">Captcha validation failed</p>}

              <Button className="btn btn-lg btn-primary mb-3" variant="primary" type="submit">
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
