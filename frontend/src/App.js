import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import AllCourses from "./pages/AllCourses/AllCourses";
import CreatorSignup from "./pages/Signup/CreatorSignup";
import LearnerSignup from "./pages/Signup/LearnerSignup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import LearnerDashboard from "./pages/LearnerDashboard/LearnerDashboard";
import CreatorDashboard from "./pages/CreatorDashboard/CreatorDashboard";
import CreatorInformation from "./pages/CreatorInformation/CreatorInformation";
import { useState } from "react";
import LearnerCourses from "./pages/LearnerCourses/LearnerCourses";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import Payment from "./pages/Payment/Payment";
import { useDispatch, useSelector } from "react-redux";
import { logInAsLearner } from "./store/actions";
import Cart from "./pages/Cart/Cart";
import Analytics from "./pages/Analytics/Analytics";
import Help from "./pages/Help/Help";

function App() {
  //TODO: If user is logged In show personal dashboard page,

  const logInAsLearner = useSelector((state) => state.loggedInAsLearner);
  console.log("LOGGED IN AS LEARNER", logInAsLearner);
  console.log(logInAsLearner);

  return (
    <>
      {logInAsLearner ? (
        <>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/" element={<LearnerCourses />} />
              <Route path="/all-courses" element={<AllCourses />} />
              <Route path="/course/:id" element={<CourseDescription />} />
              <Route path="/login" element={<Login />} />
              <Route path="/creator/:id" element={<CreatorInformation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </Container>
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: "100px", marginBottom: "100px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learner-signup" element={<LearnerSignup />} />
              <Route path="/creator-signup" element={<CreatorSignup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/all-courses" element={<AllCourses />} />
              <Route path="/creator-dashboard" element={<CreatorDashboard />} />
              <Route path="/creator/:id" element={<CreatorInformation />} />
              <Route path="/course/:id" element={<CourseDescription />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" exact={true} element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
