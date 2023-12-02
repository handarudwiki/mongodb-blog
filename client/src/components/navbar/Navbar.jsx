import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3000/images/";
  const navigate = useNavigate();

  console.log(user.profilePic);
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="navCenter">
        <ul className="navList">
          <li className="navItem">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="navItem">Contact</li>
          <li className="navItem">
            <Link to="/write" className="link">
              Write
            </Link>
          </li>
          {user && (
            <li className="navItem" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </div>
      <div className="navRight">
        {user ? (
          <Link className="link" to="/settings">
            {user.profilePic ? (
              <img className="navImage" src={PF + user.profilePic} alt="" />
            ) : (
              <img
                className="navImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXDPEf_Wmxg6KQoeB-zNeXsclz4tiOcotm3wfc0BugGR1ZK5xJb89wzZ9_wPX6CRxYO4&usqp=CAU"
                alt=""
              />
            )}
          </Link>
        ) : (
          <ul className="navList">
            <li className="navItem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="navItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};
