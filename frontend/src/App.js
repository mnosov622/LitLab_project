import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import CreatorDashboard from "./pages/CreatorDashboard/CreatorDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import CreatorInformation from "./pages/CreatorInformation/CreatorInformation";
import { useEffect, useState } from "react";
import LearnerCourses from "./pages/LearnerCourses/LearnerCourses";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import Payment from "./pages/Payment/Payment";
import { useDispatch, useSelector } from "react-redux";
import { logInAsCreator, logInAsLearner, loginAsAdmin } from "./store/actions";

import Cart from "./pages/Cart/Cart";
import Analytics from "./pages/Analytics/Analytics";
import CreatorAnalytics from "./pages/CreatorDashboard/Analytics/CreatorAnalytics";
import CourseView from "./pages/CourseView/CourseView";
import CourseUpload from "./pages/CreatorDashboard/CourseUpload/CourseUpload";
import jwtDecode from "jwt-decode";
import Test from "./pages/Test/Test";
import Certificate from "./pages/Certificate/Certificate";
import CourseEdit from "./pages/CourseEdit/CourseEdit";

// Footer content
import AboutUs from "./pages/FooterContent/Aboutus/Aboutus";
import Blog from "./pages/FooterContent/Blog/Blog";
import ContactUs from "./pages/FooterContent/ContactUs";
import ContentCreatorCommunity from "./pages/FooterContent/Community/ContentCreatorCommunity";
import Help from "./pages/FooterContent/Help";
import LearnerCommunity from "./pages/FooterContent/Community/LearnerCommunity";
import Privacy from "./pages/FooterContent/Privacy/Privacy";
import Term from "./pages/FooterContent/Term/Term";
import CreatorProfile from "./pages/CreatorProfile/CreatorProfile";
import SearchResults from "./pages/Search/SearchResults";
import ThankYou from "./pages/FooterContent/ThankYou";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInAsLearner = useSelector((state) => state.loggedInAsLearner);
  // console.log("LOGGED IN AS LEARNER", logInAsLearner);
  // console.log(logInAsLearner);
  const loggedInAsCreator = useSelector((state) => state.creatorLogin);
  const loggedInAsAdmin = useSelector((state) => state.adminLogin);

  console.log("Creator is logged in ", loggedInAsCreator);
  console.log("Learner is logged in ", loggedInAsCreator);
  console.log("Admin is logged in ", loggedInAsAdmin);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigate("/");
    }
    const token = localStorage.getItem("token");
    console.log("TOKEN is", token);
    const decoded = jwtDecode(token);
    console.log("decoded", decoded?.isAdmin);

    if (token) {
      if (decoded?.isLearner) {
        console.log("logged in as learner");
        dispatch(logInAsLearner());
      } else if (decoded?.isCreator) {
        console.log("logged in as creator");
        dispatch(logInAsCreator());
      } else if (decoded?.isAdmin) {
        console.log("logged in as admin");
        dispatch(loginAsAdmin());
      } else {
        console.log("not logged in");
      }
    } else {
      console.log("no token");
    }
  }, []);

  if (loggedInAsAdmin) {
    return (
      <>
        <Navbar />
        <Container style={{ marginTop: "100px", marginBottom: "100px" }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/course/:id" element={<CourseDescription />} />
            <Route path="/course-view/:id" element={<CourseView />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </>
    );
  }

  if (loggedInAsCreator) {
    return (
      <>
        <Navbar />
        <Container style={{ marginTop: "100px", marginBottom: "100px" }}>
          <Routes>
            <Route path="/" element={<CreatorDashboard />} />
            <Route path="/analytics" element={<CreatorAnalytics />} />
            <Route path="/upload" element={<CourseUpload />} />
            <Route path="/course/edit/:courseId" element={<CourseEdit />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<CreatorProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      {loggedInAsLearner ? (
        <>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/" element={<LearnerCourses />} />
              <Route path="/all-courses" element={<AllCourses />} />
              <Route path="/course/:id" element={<CourseDescription />} />
              <Route path="/course-view/:id" element={<CourseView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/creator/:id" element={<CreatorInformation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/test/:id" element={<Test />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/course/:id/certificate/:id"
                element={<Certificate />}
              />
              <Route path="/certificate/:id" element={<Certificate />} />

              <Route
                path="/course/*"
                element={<div>We couldn't find it</div>}
              />
              <Route path="*" exact={true} element={<NotFound />} />
              <Route path="/reset-password" element={<ResetPassword />} />
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
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/admin" element={<AdminDashboard />} />

              <Route
                path="/cccommunity"
                element={<ContentCreatorCommunity />}
              />
              <Route path="/help" element={<Help />} />
              <Route path="/lcomminuty" element={<LearnerCommunity />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/term" element={<Term />} />

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
