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

function App() {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "100px", marginBottom: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learner-signup" element={<LearnerSignup />} />
          <Route path="/creator-signup" element={<CreatorSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
