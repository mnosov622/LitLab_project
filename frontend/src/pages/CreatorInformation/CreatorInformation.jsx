import React from 'react';
import Img from "../../assets/creator.png"
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import './Info.styles.scss'

const CreatorInformation = () => {
  return (
    <Container>
      <Row className='topLine'>
        <Col xs={12} md={3}>
          <Image src={Img} roundedCircle style={{width:"300px" }}/>
        </Col>
        <Col xs={12} md={9}>
          <div className='creatorName'>
            Creator Name
          </div>
        </Col>
      </Row>
      <Row className='middleLine'>
        <div className='titleInfo'>
          About Professional Career
        </div>
        <div className='aboutInfo'>
          <p>
          A professional career refers to an individual's chosen occupation or field of work. 
          It usually involves specialized training, education, and skills in a specific area, and often requires a certain level of expertise or certification. 
          A professional career can include a wide range of fields such as law, medicine, finance, engineering, and technology, among many others.
          In order to build a professional career, individuals typically start by obtaining the necessary education and training in their chosen field. 
          This can include a degree from a university or college, as well as additional certifications or licenses. 
          After completing their education and training, individuals can then begin to look for job opportunities 
          in their field, either through direct application or through networking with professionals in their industry.
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default CreatorInformation;
