import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Learner from "./pages/Signup/learner";
import Creator from "./pages/Signup/creator"
import AllCourses from "./pages/AllCourses/AllCourses";
function App() {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learner" element={<Learner />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default App;
