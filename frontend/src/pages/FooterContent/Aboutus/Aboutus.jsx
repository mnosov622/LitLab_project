import React from "react";
import "./aboutus.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import wwb from "../../../assets/what-we-belive.jpg";
import wwh from "../../../assets/what_we_have.jpg";
import wwo from "../../../assets/what_we_offer.jpg";
import ov from "../../../assets/our_vision.jpg";

const AboutUs = () => {
  return (
    <div>
      <p className="heading">
        LitLab is a premier online learning platform that offers a comprehensive
        range of educational resources for individuals of all ages and skill
        levels. Our mission is to provide learners with the knowledge, skills,
        and confidence they need to reach their full potential and succeed in
        their personal and professional lives.
      </p>
      <Container>
        <Row className="row-1">
          <Col lg={6}>
            <h3>What We Believe</h3>
            <p>
              At LitLab, we believe that education should be accessible,
              affordable, and enjoyable. That's why we offer a wide range of
              courses and learning materials that are tailored to meet the needs
              of our diverse student body. Whether you're a student looking to
              advance your career, a parent seeking to help your child reach
              their full potential, or an individual simply looking to explore
              new interests, you'll find everything you need at LitLab.
            </p>
          </Col>
          <Col lg={6}>
            <img className="img-wwb" src={wwb} alt="Belive" />
          </Col>
        </Row>
        <Row className="row-1">
          <Col lg={6}>
            <img className="img-wwo" src={wwo} alt="Belive" />
          </Col>
          <Col lg={6}>
            <h3>What We Offer</h3>
            <p>
              Our platform is designed to be user-friendly and intuitive, so you
              can easily navigate to the courses and resources that interest
              you. And, with our mobile-friendly design, you can take your
              learning with you, wherever you go. Whether you're at home, on the
              go, or at work, you'll have access to the resources you need to
              keep growing and developing.
            </p>
            <p>
              At LitLab, we understand that everyone learns differently. That's
              why we offer a variety of learning formats, from video tutorials
              and interactive quizzes to hands-on projects and live classes. Our
              goal is to make sure that no matter your learning style, you can
              find the resources and support you need to succeed.
            </p>
            <p>
              At LitLab, we are dedicated to providing our students with a
              high-quality learning experience. If you have any questions or
              need assistance, our friendly and knowledgeable support team is
              here to help. Whether you're just starting out or need help with a
              specific course, we're here to make sure you have the support you
              need to succeed.
            </p>
          </Col>
        </Row>
        <Row className="row-1">
          <Col lg={6}>
            <h3>What We Have</h3>
            <p>
              Our team of experienced instructors and education specialists work
              hard to create engaging and effective learning experiences that
              will help you reach your goals. With a focus on delivering the
              most up-to-date and relevant content, we ensure that our courses
              stay current and relevant, so you can be confident that the
              knowledge you gain at LitLab will help you succeed in today's
              rapidly-changing world.
            </p>
            <p>
              We're proud to have a growing community of learners who are
              inspired and empowered by our courses, and we're always looking
              for new ways to make learning easier, more accessible, and more
              enjoyable. So, whether you're a beginner or an expert, we invite
              you to join the LitLab community and start exploring all that we
              have to offer.
            </p>
          </Col>
          <Col>
            <img className="img-wwh" src={wwh} alt="Belive" />
          </Col>
        </Row>
        <Row className="row-1">
          <Col lg={6}>
            <img className="img-ov" src={ov} alt="Belive" />
          </Col>
          <Col lg={6}>
            <h3>Our Vision</h3>
            <p>
              We believe that education is a journey, not a destination, and
              we're committed to helping you reach your goals, no matter what
              they may be. <br />
              So, why wait? Start your learning journey today and discover the
              power of LitLab. <br />
              And We are constantly striving to improve and expand our
              offerings, and we welcome your feedback and suggestions.
            </p>
          </Col>
        </Row>
      </Container>
      <p className="ending">
        We are confident that you will love the learning experience at LitLab,
        and we invite you to join our community of learners today. With the
        resources and support you need to reach your goals, there's never been a
        better time to start exploring all that LitLab has to offer.
      </p>
    </div>
  );
};

export default AboutUs;
