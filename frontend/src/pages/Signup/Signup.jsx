import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "../../assets/background_home.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
     <div className="text-center fs-1 " style={{paddingTop: "90px"}}>
        Welcome To LitLab
      </div>
      <br />
      <br />
      <div className="text-center display-5 mb-5 fs-4 fw-bold">
      LitLab's platform fosters a welcoming ecosystem <br />
      where learners and creators can interact and inspire each<br />
      other to reach new heights.
      </div>
      <div className="text-center mb-5 fs-5 " style={{marginTop: "-30px"}}>
        Want to become Learner or Content Creator ?
      </div>
      <div className="text-center d-flex w-25 mx-auto justify-content-evenly" style={{marginLeft:"auto", marginRight:"auto"}}>
        <Link to="/learner-signup">
          <Button
            className="btn btn-primary fs-3 mr-auto btn-lg "
            variant="primary"
            type="submit"
            style={{width:"110%"}}
          >
            Learner  
          </Button>
        </Link>
        <Link to="/creator-signup">
          <Button
            className="btn btn-lg btn-primary fs-3"
            variant="primary"
            type="submit"
            style={{width:"110%"}}
          >
            Creator
          </Button>
        </Link>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <img src={image} style={{ maxWidth:"60%", height:"auto", marginLeft:"auto", marginRight:"auto", marginTop:"100px", border: "1px solid #ddd", padding: "5px", boxShadow: "0 0 10px 5px rgba(0, 140, 186, 0.5)"}} />
      </div>
    </>
  );
};

export default Signup;
