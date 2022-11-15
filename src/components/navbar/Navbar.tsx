import React from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="title_container">
        <div className="title" onClick={navigateToHome}>
          Booking platform
        </div>
      </div>
      <div className="navbar_elements_container">
        <div className="navbar_element" onClick={navigateToProfile}>
          <CgProfile size={30} />
        </div>
      </div>
    </div>
  );
};
