import React from "react";
import "./App.css";
import { Signup } from "./components/signup/Signup";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { Navbar } from "./components/navbar/Navbar";
import { Profile } from "./components/profile/Profile";
import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import { SalonPage } from "./components/salonPage/SalonPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/salon/:id" element={<PrivateRoute />}>
            <Route path="/salon/:id" element={<SalonPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
