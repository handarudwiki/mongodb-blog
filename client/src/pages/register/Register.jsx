import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="register">
        <h3 className="registerTitle">Register</h3>
        <form action="" className="registerForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            className="registerInput"
            id="username"
            placeholder="enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            className="registerInput"
            id="email"
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            className="registerInput"
            id="password"
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton">Register</button>
        </form>
        <button className="registerLoginButton">
          <Link to="/login" className="link">
            Login
          </Link>
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </div>
    </>
  );
}
