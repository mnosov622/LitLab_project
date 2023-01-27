import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "../../components/CourseCards/CourseCard";
import empty from "../../assets/no-courses.gif";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer);
  console.log("CURRENT CART", cart);

  const goToCheckout = () => {};
  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-5">
        <p>Shopping cart</p>
      </div>
      {cart.length === 0 ? (
        <div className="text-center mb-5">
          <p className="fs-3">There are no courses yet...</p>
          <img src={empty} alt="No courses" className="ml-auto mb-5" />
          <div className="wrapper">
            <Link to="/all-courses">
              <button className="btn btn-primary btn-lg">
                Explore all courses
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <CourseCard
              cardSmall
              name={item.name}
              teacherName={item.instructor}
              image={item.courseImage}
              price={item.price}
              id={item.id}
            />
          ))}
          <div className="wrapper text-center mb-5">
            <Link to="/payment">
              <button className="btn btn-primary btn-lg" onClick={goToCheckout}>
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
