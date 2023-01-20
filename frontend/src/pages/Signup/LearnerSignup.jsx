import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
// import styles from "./styles-login.scss"
import student from "../../assets/student.png";

const LearnerSignup = () => {
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
              <Form>
                <div class="form-floating mb-3">
                  <input
                    type="name"
                    class="form-control"
                    id="floatingName"
                    placeholder="name@example.com"
                    autoFocus
                  />
                  <label for="floatingName">Full Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingEmail"
                    placeholder="Email"
                  />
                  <label for="floatingEmail">Email Address</label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingReEnterPassword"
                    placeholder="Password"
                  />
                  <label for="floatingReEnterPassword">Re-enter password</label>
                </div>

                <Button
                  className="btn btn3 btn-primary btn-lg mb-3"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
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
