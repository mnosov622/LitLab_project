import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = nameRef.current.value;
    const email = emailRef.current.value;
    const subject = subjectRef.current.value;
    const message = messageRef.current.value;

    fetch("http://localhost:8000/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, subject, message }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/thankyou");
      }
    });
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              CONTACT US
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                  <div className="contact-wrap">
                    <form
                      action=""
                      id="contactForm"
                      name="contactForm"
                      className="contactForm"
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label className="label" for="name">
                              Full Name
                            </label>
                            <input
                              ref={nameRef}
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder="Name"
                            ></input>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label className="label" for="email">
                              Email Address
                            </label>
                            <input
                              ref={emailRef}
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Email"
                            ></input>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label className="label" for="subject">
                              Subject
                            </label>
                            <input
                              ref={subjectRef}
                              type="text"
                              className="form-control"
                              name="subject"
                              id="subject"
                              placeholder="Subject"
                            ></input>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" for="#">
                              Message
                            </label>
                            <textarea
                              ref={messageRef}
                              name="message"
                              className="form-control"
                              id="message"
                              cols="30"
                              rows="4"
                              placeholder="Message"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group mt-3">
                            <input
                              type="submit"
                              value="Contact Us"
                              className="btn btn-primary btn-lg"
                            ></input>
                            <div className="submitting"></div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-4 col-md-5 d-flex align-items-stretch  bg-dark">
                  <div className="info-wrap w-100 p-md-5 p-4 text-light">
                    <h3>Let's get in touch</h3>
                    <p className="mb-4">
                      We're open for any suggestion or just to have a chat.
                    </p>
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address:</span> 198 West 21th Street Toronto, ON
                          M4X 1X3
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Phone:</span>{" "}
                          <a href="tel://12345678900">+1 (234) 547-8900</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Email:</span> litlab200@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Website: </span>{" "}
                          <a
                            href="https://lit-lab-project.vercel.app/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://lit-lab-project.vercel.app/
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
