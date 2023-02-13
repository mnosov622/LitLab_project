import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/CourseCards/CourseCard";
import empty from "../../assets/no-courses.gif";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { myCourses } from "../../store/actions";

const Cart = () => {
  const shoppingCart = localStorage.getItem("shopping_cart");
  const items = JSON.parse(shoppingCart);
  const [shoppingCartItems, setShoppingCartItems] = useState(items);
  console.log("init", shoppingCartItems);

  const cart = useSelector((state) => state.cartReducer);
  console.log("CURRENT CART", cart);
  const dispatch = useDispatch();
  const AllCourses = useSelector((state) => state.boughtCoursesReducer);
  const navigate = useNavigate();
  useEffect(() => {
    const shoppingCartItems = localStorage.getItem("shopping_cart");
    const items = JSON.parse(shoppingCartItems);
    setShoppingCartItems(items);
    console.log("shopping cart items", items);
    if (cart.length === 0) {
      console.log("for some reason");
    }
  }, []);

  const goToCheckout = () => {
    localStorage.removeItem("item_to_buy");
    localStorage.setItem("item_to_buy", JSON.stringify(shoppingCartItems));
    navigate("/payment");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      localStorage.removeItem("shopping_cart");
      window.location.reload();
    }
  };
  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-5">
        <p>Shopping cart</p>
      </div>
      {shoppingCartItems?.length === 0 || !shoppingCartItems ? (
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
          {shoppingCartItems.map((item) => (
            <CourseCard
              cardSmall
              name={item.name}
              teacherName={item.instructor}
              image={item.courseImage}
              price={item.price}
              id={item.id}
              removable
            />
          ))}

          <div className="wrapper mb-5 d-flex">
            <button className="btn btn-danger fs-5" onClick={handleClearCart}>
              Clear cart
            </button>
            <button
              className="btn btn-primary btn-lg ml-auto mx-auto"
              onClick={goToCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
