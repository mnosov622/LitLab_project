import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "../../components/CourseCards/CourseCard";

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer);
  console.log("CURRENT CART", cart);

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-5">
        <p>Shopping cart</p>
      </div>
      {cart.map((item) => (
        <CourseCard name={item.name} teacherName={item.instructor} />
      ))}
    </>
  );
};

export default Cart;
