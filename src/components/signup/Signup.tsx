import React, { useRef, useState } from "react";
import "./Signup.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh
    if (
      nameRef.current !== null &&
      emailRef.current != null &&
      passwordRef.current != null &&
      passwordConfirmRef.current != null &&
      nameRef.current["value"] !== "" &&
      emailRef.current["value"] !== "" &&
      passwordRef.current["value"] !== "" &&
      passwordConfirmRef.current["value"] !== ""
    ) {
      // console.log("submitting form");

      const name = nameRef.current["value"];
      if (
        passwordRef.current["value"] !== passwordConfirmRef.current["value"]
      ) {
        return setError("Passwords do not match");
      } else if (passwordRef.current["value"]["length"] < 6) {
        return setError("Password must be at least 6 characters");
      }

      try {
        setError("");
        setLoading(true);

        await signup(
          emailRef.current["value"],
          passwordRef.current["value"],
          name
        );
        navigate("/");
      } catch {
        setError("Failed to create an account");
      }
      setLoading(false); // reset loading state
    } else {
      setError("Fill out all fields");
    }
  };

  return (
    <div className="signup_container">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup_title">Sign Up</h1>
        {error && <p className="signup_error">{error}</p>}
        <div className="input_container">
          <div>Name</div>
          <input className="input" type="name" ref={nameRef}></input>
        </div>
        <div className="input_container">
          <div>Email</div>
          <input className="input" type="email" ref={emailRef}></input>
        </div>
        <div className="input_container">
          <div>Password</div>
          <input className="input" type="password" ref={passwordRef}></input>
        </div>
        <div className="input_container">
          <div>Confirm password</div>
          <input
            className="input"
            type="password"
            ref={passwordConfirmRef}
          ></input>
        </div>
        <button className="signup_button" disabled={loading}>
          Sign Up
        </button>
        <div className="redirect">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};
