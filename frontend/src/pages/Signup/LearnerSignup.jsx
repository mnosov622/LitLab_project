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
import GoogleLogin from "react-google-login";

const LearnerSignup = () => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [captchaError, setCaptchaError] = useState(false);

  // Define state variables for the input values and validation errors
  const [fnameError, setFNameError] = useState(null);
  const [lnameError, setLNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

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

  // Define a function to validate the password input field
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
      return setPasswordError("Password must contain at least one capital letter, one number, and one special symbol.");
    }

    // Ensure the password is at least 8 characters long
    if (password.length < 8) {
      return setPasswordError("Password must be at least 8 characters long.");
    }
    // If all checks pass, return null to indicate success
    return setPasswordError(null);
  }

  const onSuccess = async (res) => {
    // navigate("/");
    const { name, email } = res.profileObj;

    const recaptchaResponse = captchaRef.current.getValue();

    const url = "http://localhost:8000/validate-recaptcha";
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

    if (result.success) {
      try {
        const response = await fetch("http://localhost:8000/register-with-google", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            token: res.accessToken,
            isLearner: true,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 409) {
          return setUserExists(true);
        }
        navigate("/login", { state: { success: true } });
        setUserExists(false);
      } catch (e) {}
    }
  };

  const onFailure = (err) => {
    setUserExists(true);
  };

  const handleSignup = async (e) => {
    setShowLoader(true);
    e.preventDefault();

<<<<<<< HEAD
    const recaptchaResponse = captchaRef.current.getValue();

    const url = "http://localhost:8000/validate-recaptcha";
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

    if (passwordMatch && !passwordError && result.success) {
=======
    if (passwordMatch && !passwordError) {
>>>>>>> caa680ff2c17ba6dcff25b95809f3ecf82456257
      try {
        const fullName = `${firstName} ${lastName}`;
        const response = await fetch("http://localhost:8000/registerLearner", {
          method: "POST",
          body: JSON.stringify({ name: fullName, email, password, isLearner: true }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          navigate("/login", { state: { success: true } });
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
      <div className="mt-5">
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <div>
                <img className="img" src={student} alt="Login In" style={{ width: "30em" }} />
              </div>
            </Col>
            <Col className="form mt-5">
              <h2 className="mb-3 fs-2">Create an account to get started</h2>
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
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUserExists(false);
                    }}
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
                {userExists && (
                  <div className="text-danger">User with this email already exists</div>
                )}
                <ReCAPTCHA
                  className="mt-2 mb-2"
                  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                  ref={captchaRef}
                />
                {captchaError && <p className="text-danger">Captcha validation failed</p>}
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
                <div>
                  or
                  <div className="mt-3">
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                      buttonText="Sign up with Google"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={false}
                      className="mb-3"
                    />
                  </div>
                </div>
                <Form.Group>
                  <Form.Label className="font2">
                    Already have account ?
                    <Link to="/login" className="">
                      <Form.Label className="font2 link">&nbsp;Log In</Form.Label>
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
