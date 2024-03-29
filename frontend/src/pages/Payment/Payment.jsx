import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert, positions } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../components/CourseCards/CourseCard";
import PaymentLogo from "../../assets/PaymentLogo.png";
import jwtDecode from "jwt-decode";

const Payment = () => {
  const alert = useAlert();

  const navigate = useNavigate();
  const currentCart = useSelector((state) => state.cartReducer);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const item = localStorage.getItem("item_to_buy");
  const item_to_buy = JSON.parse(item);

  // Define state variables for the input values and validation errors
  const [cardNoError, setCardNoError] = useState(null);
  const [cardNameError, setCardNameError] = useState(null);
  const [cvvError, setCvvError] = useState(null);

  function handleCardNo() {
    // Ensure the subject contains only valid characters
    if (!/^[0-9]+$/.test(cardNumber)) {
      return setCardNoError("Card Number can only contain numbers.");
    }
    return setCardNoError(null);
  }

  function handleCardName() {
    // Ensure the subject contains only valid characters
    if (!/^[a-zA-Z\s]*$/.test(cardHolderName)) {
      return setCardNameError("Card Holder Name can only contain letters and spaces.");
    }
    return setCardNameError(null);
  }

  function handleCvv() {
    // Ensure the subject contains only valid characters
    if (!/^[0-9]+$/.test(cvv)) {
      return setCvvError("CVV can only contain numbers.");
    }
    return setCvvError(null);
  }

  useEffect(() => {
    if (item_to_buy.length > 1 || Array.isArray(item_to_buy)) {
      const prices = item_to_buy.map((item) => Number(item.price));
      const pricesTotal = prices.reduce((sum, item) => sum + item, 0);
      setTotalAmount(pricesTotal);
    }
    fetch(`https://litlab-backend-v2.vercel.app/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();

    let num = item_to_buy.price; // replace 100 with the number you want to calculate
    let companyRevenue = num * 0.2; // calculates 20% of num
    let creatorProfit = num - companyRevenue; // calculates the remaining 80% of num

    console.log(`20% of ${num} is ${companyRevenue}`);
    console.log(`The remaining 80% of ${num} is ${creatorProfit}`);

    // Perform validation here and submit the form data to the server

    if (!Array.isArray(item_to_buy)) {
      try {
        const courses = {
          id: item_to_buy?.id,
          courseName: item_to_buy?.name,
          instructor: item_to_buy?.instructor,
          courseImage: item_to_buy.courseImageURL,
          price: item_to_buy.price,
          isCompleted: false,
        };

        fetch("https://litlab-backend-v2.vercel.app/courses/creator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseName: item_to_buy.name,
            courseImage: item_to_buy.courseImageURL,
            userName: userData.name,
            userEmail: userData.email,
            email: item_to_buy.email,
          }),
        }).then((res) => {});

        fetch("https://litlab-backend-v2.vercel.app/courses/creator/enrollments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: item_to_buy.email }),
        }).then((res) => {});
        fetch(`https://litlab-backend-v2.vercel.app/courses/${item_to_buy.id}/increase-enrollments`, {
          method: "PUT",
        });

        await fetch("https://litlab-backend-v2.vercel.app/buy-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ courses }),
        });
        alert.success("Course was succesfully purchased", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000, // custom timeout just for this one alert
        });

        const formData = new URLSearchParams();
        formData.append("email", item_to_buy.email);
        formData.append("amount", creatorProfit);

        await fetch("https://litlab-backend-v2.vercel.app/creator/moneyEarned", {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });

        fetch("https://litlab-backend-v2.vercel.app/users/increment-revenue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyRevenue }),
        })
          .then((res) => res.text())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));

        navigate("/");
      } catch (e) {}
    } else {
      try {
        const courses = [];
        item_to_buy.forEach((item) => {
          courses.push({
            id: item.id,
            courseName: item.name,
            instructor: item.instructor,
            courseImage: item.courseImageURL,
            price: item.price,
            isCompleted: false,
          });
        });

        fetch("https://litlab-backend-v2.vercel.app/buy-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ courses }),
        });
        alert.success("Courses were succesfully purchased", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000, // custom timeout just for this one alert
        });

        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (e) {}
    }
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
                  courseImage={item_to_buy?.courseImageURL}
                  teacherName={item_to_buy?.instructor}
                  id={item_to_buy?.id}
                />
              )}
            </div>
          </div>
          <div className="p-4 mx-auto col-md-5 h-100 bg-light shadow">
            <form onSubmit={handlePayment}>
              <div class="form-group mb-2">
                <label htmlFor="cardNumber">Card number</label>
                <input
                  class="form-control"
                  type="text"
                  id="cardNumber"
                  maxLength="16"
                  pattern="[0-9]*"
                  placeholder="1234-5678-1212-1213"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  onKeyUp={handleCardNo}
                  required
                  style={{ width: "72%" }}
                />
                {cardNoError && <div className="text-danger mt-2">{cardNoError}</div>}
              </div>
              <div class="form-group mb-2">
                <label htmlFor="cardHolderName">Cardholder name</label>
                <input
                  class="form-control"
                  type="text"
                  id="cardHolderName"
                  maxLength="40"
                  placeholder="Jackie Chan"
                  value={cardHolderName}
                  onChange={(event) => setCardHolderName(event.target.value)}
                  onKeyUp={handleCardName}
                  required
                  style={{ width: "72%" }}
                />
                {cardNameError && <div className="text-danger mt-2">{cardNameError}</div>}
              </div>

              <div className="d-flex">
                <div style={{ width: "70%" }}>
                  <label htmlFor="expirationDate">Expiration Date</label>
                  <div className="d-flex">
                    <select
                      class="form-control "
                      id="expirationDate"
                      required
                      style={{ width: "90% !important" }}
                    >
                      <option value="" disabled selected>
                        Select a month
                      </option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>

                    <select class="form-control" id="expiryYear" required>
                      <option value="" disabled selected>
                        Select a year
                      </option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2030">2031</option>
                      <option value="2030">2032</option>
                    </select>
                  </div>
                </div>
                <div className="item2" style={{ marginLeft: "15px" }}>
                  <label htmlFor="cvv">CVV</label>

                  <input
                    class="form-control mb-2"
                    type="text"
                    id="cvv"
                    value={cvv}
                    maxLength="3"
                    placeholder="000"
                    pattern="[0-9]*"
                    onChange={(event) => setCvv(event.target.value)}
                    onKeyUp={handleCvv}
                    required
                    style={{ width: "30%" }}
                  />
                  {cvvError && <div className="text-danger mt-2">{cvvError}</div>}
                </div>
              </div>
              <div class="form-group">
                <img src={PaymentLogo} width="250" height="50" alt="Payment logos" />
              </div>

              <p className="fs-3">
                Total: <span>{item_to_buy?.price}$</span>
              </p>
              <button className="btn btn-primary btn-lg" style={{ width: "63%" }}>
                Pay
              </button>
            </form>
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
                courseImage={item.courseImageURL}
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
        <div className="p-4 offset-1 col-md-5 h-100 bg-light shadow">
          <form onSubmit={handlePayment}>
            <div class="form-group mb-2">
              <label htmlFor="cardNumber">Card number</label>
              <input
                class="form-control"
                type="text"
                id="cardNumber"
                maxLength="16"
                pattern="[0-9]*"
                placeholder="1234-5678-1212-1213"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                onKeyUp={handleCardNo}
                required
                style={{ width: "72%" }}
              />
              {cardNoError && <div className="text-danger mt-2">{cardNoError}</div>}
            </div>
            <div class="form-group mb-2">
              <label htmlFor="cardHolderName">Cardholder name</label>
              <input
                class="form-control"
                type="text"
                id="cardHolderName"
                maxLength="40"
                placeholder="Jackie Chan"
                value={cardHolderName}
                onChange={(event) => setCardHolderName(event.target.value)}
                onKeyUp={handleCardName}
                required
                style={{ width: "72%" }}
              />
              {cardNameError && <div className="text-danger mt-2">{cardNameError}</div>}
            </div>

            <div className="d-flex">
              <div style={{ width: "70%" }}>
                <label htmlFor="expirationDate">Expiration Date</label>
                <div className="d-flex">
                  <select
                    class="form-control w-100"
                    id="expirationDate"
                    required
                    style={{ width: "100% !important" }}
                  >
                    <option value="" disabled selected>
                      Select a month
                    </option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>

                  <select class="form-control" id="expiryYear" required>
                    <option value="" disabled selected>
                      Select a year
                    </option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2030">2031</option>
                    <option value="2030">2032</option>
                  </select>
                </div>
              </div>
              <div className="item2" style={{ marginLeft: "10px" }}>
                <label htmlFor="cvv">CVV</label>

                <input
                  class="form-control mb-2  "
                  style={{ width: "30%" }}
                  type="text"
                  id="cvv"
                  value={cvv}
                  maxLength="3"
                  placeholder="000"
                  pattern="[0-9]*"
                  onChange={(event) => setCvv(event.target.value)}
                  onKeyUp={handleCvv}
                  required
                />
                {cvvError && <div className="text-danger mt-2">{cvvError}</div>}
              </div>
            </div>
            <div class="form-group">
              <img src={PaymentLogo} width="250" height="50" alt="Payment logos" />
            </div>

            <p className="fs-3">
              Total: <span>{totalAmount}$</span>
            </p>
            <button className="btn btn-primary btn-lg" style={{ width: "63%" }}>
              Pay
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Payment;
