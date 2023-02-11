import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert, positions } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../components/CourseCards/CourseCard";

const Payment = () => {
  //TODO: Add sockets, so that user don't have to refresh page when he buys the course

  const alert = useAlert();

  const navigate = useNavigate();
  const currentCart = useSelector((state) => state.cartReducer);
  console.log("CURRENT CART", currentCart);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const token = localStorage.getItem("token");
  const item = localStorage.getItem("item_to_buy");
  const item_to_buy = JSON.parse(item);
  console.log("course name", item_to_buy);
  useEffect(() => {
    if (currentCart.length > 1) {
      const prices = currentCart.map((item) => Number(item.price));
      const pricesTotal = prices.reduce((sum, item) => sum + item, 0);
      setTotalAmount(pricesTotal);
    }
  }, []);

  const pay = async () => {
    if (!Array.isArray(item_to_buy)) {
      try {
        fetch("http://localhost:8000/buy-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            courseId: item_to_buy?.id,
            name: item_to_buy?.name,
            instructor: item_to_buy?.instructor,
            courseImage: item_to_buy.image,
            price: item_to_buy.price,
          }),
        });
        alert.success("Course was succesfully purchased", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000, // custom timeout just for this one alert
        });
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (e) {
        console.log("An error occured", e);
      }
    } else {
      try {
        fetch("http://localhost:8000/buy-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            courseId: item_to_buy[0]?.id,
            name: item_to_buy[0]?.name,
            instructor: item_to_buy[0]?.instructor,
            courseImage: item_to_buy[0].courseImage,
            price: item_to_buy[0].price,
            isCompleted: false,
          }),
        });
        alert.success("Course was succesfully purchased", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000, // custom timeout just for this one alert
        });
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (e) {
        console.log("An error occured", e);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation here and submit the form data to the server
    console.log("Card Number:", cardNumber);
    console.log("Card Holder Name:", cardHolderName);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
  };

  if (!Array.isArray(item_to_buy)) {
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
              {item_to_buy && (
                <CourseCard
                  name={item_to_buy?.name}
                  price={item_to_buy?.price}
                  image={item_to_buy?.image}
                  teacherName={item_to_buy?.instructor}
                  id={item_to_buy?.id}
                />
              )}
            </div>
          </div>
          <div className="p-4 col-md-6 h-100 bg-light shadow">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  class="form-control"
                  type="text"
                  id="cardNumber"
                  maxLength="16"
                  pattern="[0-9]*"
                  placeholder="1234-5678-"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                />
              </div>
              <div class="form-group">
                <label htmlFor="cardHolderName">Card Holder Name:</label>
                <input
                  class="form-control"
                  type="text"
                  id="cardHolderName"
                  value={cardHolderName}
                  onChange={(event) => setCardHolderName(event.target.value)}
                />
              </div>
              <div class="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                  class="form-control"
                  type="date"
                  id="expiryDate"
                  value={expiryDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => setExpiryDate(event.target.value)}
                />
              </div>

              <div class="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  class="form-control"
                  type="text"
                  id="cvv"
                  value={cvv}
                  maxLength="3"
                  pattern="[0-9]*"
                  onChange={(event) => setCvv(event.target.value)}
                />
              </div>
            </form>
            <p className="fs-3">
              Total: <span>{item_to_buy?.price}$</span>
            </p>
            <button className="btn btn-primary btn-lg w-100" onClick={pay}>
              Pay
            </button>
          </div>
        </div>
      </>
    );
  } else if (Array.isArray(item_to_buy)) {
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
          {item_to_buy ? (
            item_to_buy.map((item) => (
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
                src={item_to_buy?.courseImage}
                alt="Course"
                width={"20%"}
                className="rounded col-md-4"
              />
              <div className="col-md-8">
                <p className="fs-4 text-primary">{item_to_buy?.name}</p>
                <p className="fs-4">Price: {item_to_buy?.price ?? 120}$</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 col-md-6 h-100 bg-light shadow">
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                class="form-control"
                type="text"
                id="cardNumber"
                maxLength="16"
                pattern="[0-9]*"
                placeholder="1234-5678-"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
              />
            </div>
            <div class="form-group">
              <label htmlFor="cardHolderName">Card Holder Name:</label>
              <input
                class="form-control"
                type="text"
                id="cardHolderName"
                placeholder="Maxim Nosov"
                value={cardHolderName}
                onChange={(event) => setCardHolderName(event.target.value)}
              />
            </div>
            <div class="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                class="form-control"
                type="date"
                id="expiryDate"
                value={expiryDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => setExpiryDate(event.target.value)}
              />
            </div>

            <div class="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input
                class="form-control"
                type="text"
                id="cvv"
                value={cvv}
                maxLength="3"
                pattern="[0-9]*"
                onChange={(event) => setCvv(event.target.value)}
              />
            </div>
            <div class="form-group">
              {/* <img src={PaymentLogo} width="250" height="50" alt="Visa and Mastercard logo" /> */}
            </div>
          </form>
          <p className="fs-3">
            Total: <span>{item_to_buy[0]?.price}$</span>
          </p>
          <button className="btn btn-primary btn-lg w-100" onClick={pay}>
            Pay
          </button>
        </div>
      </div>
    );
  }
};

export default Payment;
