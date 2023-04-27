import "./App.css";
import "./App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/Navbar";
import Auth from "./screens/Auth/auth";
import Login from "./screens/Auth/Login";
import Landing from "./screens/landing/Landing";
import Contribute from "./screens/Contribute/Contribute";
import Review from "./screens/Review/Review";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Auth />} />
        <Route exact path="contribute" element={<Contribute />} />
        <Route exact path="review" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
