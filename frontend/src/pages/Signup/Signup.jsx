import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img1 from "../../assets/signup-page-img1.png";
import img2 from "../../assets/signup-page-img2.png";
import img3 from "../../assets/signup-page-img3.png";
import img4 from "../../assets/signup-page-img4.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="text-center fs-1 text-light bg-secondary rounded">
        Welcome To LitLab
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <img src={img3} alt="Studying" style={{ width: "200px" }} />
        <img src={img4} alt="Studying" style={{ width: "200px" }} />
      </div>

      <div className="text-center mb-5 fs-1 ">
        Want to become Learner or Content Creator ?
      </div>
      <div className="text-center d-flex w-50 mx-auto justify-content-evenly">
        <Link to="/learner-signup">
          <Button
            className="btn btn-primary fs-1 mr-auto btn-lg"
            variant="primary"
            type="submit"
          >
            Learner
          </Button>
        </Link>
        <Link to="/creator-signup">
          <Button
            className="btn btn-lg btn-primary fs-1"
            variant="primary"
            type="submit"
          >
            Creator
          </Button>
        </Link>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <img src={img1} alt="Studying" style={{ width: "200px" }} />
        <img src={img2} alt="Studying" style={{ width: "200px" }} />
      </div>
    </>
  );
};

export default Signup;
