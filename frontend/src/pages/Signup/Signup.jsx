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
import styles from "./styles-signup.scss";

const Signup = () => {
  return (
    <>
    
      <div>
        <img
          className="img3"
          src={img3}
          alt="No Img3"
          style={{ width: "200px" }}
        />
        <img
          className="img4"
          src={img4}
          alt="No Img4"
          style={{ width: "200px" }}
        />
      </div>

      <div className="font">Welcome To LitLab</div>
      <div className="lcfont">Want to become Learner or Creator ?</div>
      <div className="center">
        <Link to="/learner-signup" className="">
          <Button
            className="btn btn1 btn-primary"
            variant="primary"
            type="submit"
          >
            Learner
          </Button>
        </Link>
        <Link to="/creator-signup" className="">
          <Button
            className="btn btn2 btn-primary"
            variant="primary"
            type="submit"
          >
            Creator
          </Button>
        </Link>
      </div>
      <div>
        <img
          className="img1"
          src={img1}
          alt="No Img1"
          style={{ width: "300px" }}
        />
        <img
          className="img2"
          src={img2}
          alt="No img2"
          style={{ width: "300px" }}
        />
      </div>
      
    </>
  );
};

export default Signup;
