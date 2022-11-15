import React, { useRef, useState } from "react";
import "../signup/Signup.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh
    if (
      emailRef.current != null &&
      passwordRef.current != null &&
      emailRef.current["value"] !== "" &&
      passwordRef.current["value"] !== ""
    ) {
      // console.log("submitting form");

      try {
        setError("");
        setLoading(true);
        // console.log("login");
        await login(emailRef.current["value"], passwordRef.current["value"]);
        navigate("/");
      } catch {
        setError("Failed to login");
      }
      setLoading(false); // reset loading state
    } else {
      setError("Fill out all fields");
    }
  };

  return (
    <div className="signup_container">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup_title">Login</h1>
        {error && <p className="signup_error">{error}</p>}
        <div className="input_container">
          <div>Email</div>
          <input className="input" type="email" ref={emailRef}></input>
        </div>
        <div className="input_container">
          <div>Password</div>
          <input className="input" type="password" ref={passwordRef}></input>
        </div>
        <button className="signup_button" disabled={loading}>
          Log In
        </button>
        <div className="redirect">
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
