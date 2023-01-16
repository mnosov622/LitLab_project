import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default App;
