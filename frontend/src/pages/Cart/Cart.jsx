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
      <div className="row">
        {cart.map((item) => (
          <CourseCard
            cardSmall
            name={item.name}
            teacherName={item.instructor}
            image={item.courseImage}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
};

export default Cart;
