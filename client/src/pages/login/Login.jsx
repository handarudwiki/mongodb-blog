import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import "./login.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const username = useRef();
  const password = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username: username.current.value,
        password: password.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
      navigate("/posts");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <h3 className="loginTitle">Login</h3>
        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            className="loginInput"
            id="username"
            placeholder="enter your username"
            ref={username}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            className="loginInput"
            id="password"
            placeholder="enter your password"
            ref={password}
          />
          <button className="loginButton">Login</button>
        </form>
        <button className="loginRegisterButton">
          <Link to="/register" className="link">
            Register
          </Link>
        </button>
      </div>
    </>
  );
}
