import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../../components/CourseCards/CourseCard";

const Payment = () => {
  const courseToBuy = localStorage.getItem("Item_to_buy");
  const course = JSON.parse(courseToBuy);
  console.log("COURSE TO BUY", course);
  const currentCart = useSelector((state) => state.cartReducer);
  console.log("CURRENT CART", currentCart);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (currentCart.length > 1) {
      const prices = currentCart.map((item) => Number(item.price));
      const pricesTotal = prices.reduce((sum, item) => sum + item, 0);
      setTotalAmount(pricesTotal);
    }
  }, [currentCart, course]);

  const pay = () => {
    //do magic
    // window.location.href = "/";
    console.log("COURSE TO APPEAR ON DASHBODRD", currentCart);
    localStorage.setItem("Item_to_buy", JSON.stringify(currentCart));
  };

  if (course) {
    return (
      <>
        <div className="row">
          <div className=" col-md-6 fs-1">
            <div className="row border-bottom ">
              <p className="d-flex align-items-center col-2">
                Checkout
                <svg
                  className="col-7"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 22C6.45 22 5.97933 21.8043 5.588 21.413C5.196 21.021 5 20.55 5 20C5 19.45 5.196 18.979 5.588 18.587C5.97933 18.1957 6.45 18 7 18C7.55 18 8.02067 18.1957 8.412 18.587C8.804 18.979 9 19.45 9 20C9 20.55 8.804 21.021 8.412 21.413C8.02067 21.8043 7.55 22 7 22ZM17 22C16.45 22 15.9793 21.8043 15.588 21.413C15.196 21.021 15 20.55 15 20C15 19.45 15.196 18.979 15.588 18.587C15.9793 18.1957 16.45 18 17 18C17.55 18 18.021 18.1957 18.413 18.587C18.8043 18.979 19 19.45 19 20C19 20.55 18.8043 21.021 18.413 21.413C18.021 21.8043 17.55 22 17 22ZM6.15 6L8.55 11H15.55L18.3 6H6.15ZM7 17C6.25 17 5.68333 16.6707 5.3 16.012C4.91667 15.354 4.9 14.7 5.25 14.05L6.6 11.6L3 4H1.975C1.69167 4 1.45833 3.904 1.275 3.712C1.09167 3.52067 1 3.28333 1 3C1 2.71667 1.096 2.479 1.288 2.287C1.47933 2.09567 1.71667 2 2 2H3.625C3.80833 2 3.98333 2.05 4.15 2.15C4.31667 2.25 4.44167 2.39167 4.525 2.575L5.2 4H19.95C20.4 4 20.7083 4.16667 20.875 4.5C21.0417 4.83333 21.0333 5.18333 20.85 5.55L17.3 11.95C17.1167 12.2833 16.875 12.5417 16.575 12.725C16.275 12.9083 15.9333 13 15.55 13H8.1L7 15H18.025C18.3083 15 18.5417 15.0957 18.725 15.287C18.9083 15.479 19 15.7167 19 16C19 16.2833 18.904 16.5207 18.712 16.712C18.5207 16.904 18.2833 17 18 17H7Z"
                    fill="#0C6AF3"
                  />
                </svg>
              </p>
            </div>

            <p className="fs-3 fw-bold">Order details</p>
            <div className="row">
              {/* <img
                src={course?.courseImage}
                alt="Course"
                width={"20%"}
                className="rounded col-md-4"
              />
              <div className="col-md-8">
                <p className="fs-4 text-primary">{course?.name}</p>
                <p className="fs-4">Price: {course?.price ?? 120}$</p>
              </div> */}
              <CourseCard
                name={course.name}
                price={course.price}
                image={course.courseImage}
                teacherName={course.instructor}
                id={course.id}
              />
            </div>
          </div>
          <div className="p-4 col-md-6 h-100 bg-light shadow">
            <p className="fs-3">
              Total: <span>{course.price}$</span>
            </p>
            <Link to="/" className="btn btn-primary btn-lg w-100" role="button">
              Pay
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="row">
      <div className=" col-md-6 fs-1">
        <div className="row border-bottom ">
          <p className="d-flex align-items-center col-2">
            Checkout
            <svg
              className="col-7"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 22C6.45 22 5.97933 21.8043 5.588 21.413C5.196 21.021 5 20.55 5 20C5 19.45 5.196 18.979 5.588 18.587C5.97933 18.1957 6.45 18 7 18C7.55 18 8.02067 18.1957 8.412 18.587C8.804 18.979 9 19.45 9 20C9 20.55 8.804 21.021 8.412 21.413C8.02067 21.8043 7.55 22 7 22ZM17 22C16.45 22 15.9793 21.8043 15.588 21.413C15.196 21.021 15 20.55 15 20C15 19.45 15.196 18.979 15.588 18.587C15.9793 18.1957 16.45 18 17 18C17.55 18 18.021 18.1957 18.413 18.587C18.8043 18.979 19 19.45 19 20C19 20.55 18.8043 21.021 18.413 21.413C18.021 21.8043 17.55 22 17 22ZM6.15 6L8.55 11H15.55L18.3 6H6.15ZM7 17C6.25 17 5.68333 16.6707 5.3 16.012C4.91667 15.354 4.9 14.7 5.25 14.05L6.6 11.6L3 4H1.975C1.69167 4 1.45833 3.904 1.275 3.712C1.09167 3.52067 1 3.28333 1 3C1 2.71667 1.096 2.479 1.288 2.287C1.47933 2.09567 1.71667 2 2 2H3.625C3.80833 2 3.98333 2.05 4.15 2.15C4.31667 2.25 4.44167 2.39167 4.525 2.575L5.2 4H19.95C20.4 4 20.7083 4.16667 20.875 4.5C21.0417 4.83333 21.0333 5.18333 20.85 5.55L17.3 11.95C17.1167 12.2833 16.875 12.5417 16.575 12.725C16.275 12.9083 15.9333 13 15.55 13H8.1L7 15H18.025C18.3083 15 18.5417 15.0957 18.725 15.287C18.9083 15.479 19 15.7167 19 16C19 16.2833 18.904 16.5207 18.712 16.712C18.5207 16.904 18.2833 17 18 17H7Z"
                fill="#0C6AF3"
              />
            </svg>
          </p>
        </div>

        <p className="fs-3 fw-bold">Order details</p>
        {currentCart ? (
          currentCart.map((item) => (
            <CourseCard
              name={item.name}
              image={item.courseImage}
              teacherName={item.instructor}
              price={item.price}
              id={item.id}
            />
          ))
        ) : (
          <div className="row">
            <img
              src={course?.courseImage}
              alt="Course"
              width={"20%"}
              className="rounded col-md-4"
            />
            <div className="col-md-8">
              <p className="fs-4 text-primary">{course?.name}</p>
              <p className="fs-4">Price: {course?.price ?? 120}$</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 col-md-6 h-100 bg-light shadow">
        <p className="fs-3">
          Total: <span>{totalAmount}$</span>
        </p>
        <Link to="/" className="btn btn-primary btn-lg w-100" onClick={pay}>
          Pay
        </Link>
      </div>
    </div>
  );
};

export default Payment;
