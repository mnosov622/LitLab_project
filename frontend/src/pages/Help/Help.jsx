import React from "react";

const Help = () => {
  return (
    <>
      <div className="text-center fs-3">
        <div className="title">Frequently Asked Questions</div>
      </div>
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <strong>Q. How do I register for a course?</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  Visit the website of the institution offering the course.
                </li>
                <li>
                  Find the course you are interested in and click on it to view
                  more information.
                </li>
                <li>
                  Follow the instructions to register for the course, which may
                  include creating an account, and providing payment
                  information.
                </li>
                <li>
                  Once you have completed the registration process, you will
                  receive a confirmation email or other notification that your
                  registration has been accepted.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <strong>Q. What type of courses do you offer?</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
          >
            <div className="accordion-body">
              We offer a wide range of courses, including online as well as
              self-paced and instructor-led courses. Our courses cover topics
              such as computer science, language learning, psychology, personal
              development, and more.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <strong>
                Q. How can I find the right language course for me?
              </strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
          >
            <div className="accordion-body">
              Finding the right language course for you can be a difficult task,
              as there are many different types of courses available. It is
              important to consider your learning style and goals when selecting
              a course. For example, if you are a visual learner, you may want
              to look for courses that include videos or other visual elements.
              Additionally, if you are looking to become fluent in the language,
              you may want to look for courses that focus on conversational
              skills. Finally, it is important to consider the cost of the
              course and make sure that it fits within your budget.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <strong>
                Q. Is there a way to get a certificate after completing a course
                on LitLab?
              </strong>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
          >
            <div className="accordion-body">
              Yes, you can get a certificate after completing a course on
              LitLab. After completing the course, you will be able to purchase
              a Certificate of Completion from the course page. The cost of the
              certificate varies depending on the course. Once you purchase the
              certificate, you will receive an email with a link to download and
              print your certificate. You can also share your certificate on
              social media or add it to your LinkedIn profile.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <strong>
                Q. How long does it take to complete a course on LitLab?
              </strong>
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
          >
            <div className="accordion-body">
              The length of time it takes to complete a course on LitLab depends
              on the type of course and the individual's learning style. Some
              courses may take as little as a few weeks, while others may take
              several months or even a year. Additionally, some courses may
              require additional work outside of the course, such as completing
              projects or assignments. Ultimately, the amount of time it takes
              to complete a course on LitLab will depend on the individual's
              commitment and dedication to learning.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
