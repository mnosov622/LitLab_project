import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import instagram from "../assets/instagram.png";
import linkedIn from "../assets/linkedin.png";

const Footer = () => {
  return (
    <Container>
      <div className="position-absolute border-top footer border-bottom">
        <footer className="mt-5 position-relative">
          <div className="row mt-5 p-2">
            <div className="col-md-3">
              <p className="fs-5 fw-bold">LitLab</p>
              <Link to="#about">
                <p className="">About us</p>
              </Link>
              <Link to="">
                <p className="">Most popular courses</p>
              </Link>
              <Link to="">
                <p className="">Explore all courses</p>
              </Link>
            </div>
            <div className="col-md-3">
              <p className="fs-5 fw-bold">Community</p>
              <Link to="/creator-signup">
                <p className="">Content creator</p>
              </Link>
              <Link to="/learner-signup">
                <p className="">Learner</p>
              </Link>
              <Link to="/">
                <p className="">Blog</p>
              </Link>
            </div>
            <div className="col-md-3">
              <p className="fs-5 fw-bold">More</p>
              <Link to="/Help">
                <p className="">Help</p>
              </Link>
              <Link to="/">
                <p className="">Terms</p>
              </Link>
              <Link to="/">
                <p className="">Privacy Policy</p>
              </Link>
              <Link to="/ContactUs">
                <p className="">Contact Us</p>
              </Link>
              <Link to="/">
                <p className="">Most popular questions</p>
              </Link>
            </div>
            <div className="col-md-3">
              <p className="fw-bold fs-5">Find us on social media</p>
              <img
                style={{ width: "10%" }}
                src={instagram}
                alt="Instagram Icon"
              ></img>
              <img
                style={{ width: "10%", marginLeft: "20px" }}
                src={linkedIn}
                alt="LinkediIn Icon"
              ></img>
            </div>
          </div>
        </footer>
        <div className="border-top p-1 mt-5 text-muted">
          <p className="mt-2">
            © 2023 LitLab Learning - Seneca College. All rights reserved.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
