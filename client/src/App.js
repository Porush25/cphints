import "./App.css";
import "./App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/Navbar";
import Auth from "./screens/Auth/auth";
import Login from "./screens/Auth/Login";
import Landing from "./screens/landing/Landing";
import Contribute from "./screens/Contribute/Contribute";
import ReviewRoute from "./screens/Review/ReviewRoute";
import Problems from "./screens/Problems/Problems";
import Profile from "./screens/Profile/Profile";
import Hints from "./screens/Hints/Hints";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
import { ToastContainer } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Auth />} />
        <Route exact path="contribute" element={<Contribute />} />
        <Route exact path="problems" element={<Problems />} />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="hints" element={<Hints />} />
        <Route exact path="review" element={<ReviewRoute />} />
        <Route exact path="leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
