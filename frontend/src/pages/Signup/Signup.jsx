import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image1 from "../../assets/background_home1.png";
import image2 from "../../assets/background_home2.png";
import image3 from "../../assets/background_home3.png";
import { Link } from "react-router-dom";
import './signUp.scss'

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
      <div class="row_bg">
        <div class="column_bg">
        <img src={image1} style={{ maxWidth:"100%", height:"auto", boxShadow: "0 0 10px 5px rgba(0, 140, 186, 0.5)"}} />
        </div>
        <div class="column_bg">
        <img src={image2} style={{ maxWidth:"100%", height:"auto", boxShadow: "0 0 10px 5px rgba(0, 140, 186, 0.5)"}} />
        </div>
        <div class="column_bg">
        <img src={image3} style={{ maxWidth:"100%", height:"auto", boxShadow: "0 0 10px 5px rgba(0, 140, 186, 0.5)"}} />
        </div>
      </div>
    </>
  );
};

export default Signup;
