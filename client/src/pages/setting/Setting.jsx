import { useContext, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import "./setting.css";
import { Context } from "../../context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:3000/images/";
  const MySwal = withReactContent(Swal);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        // await axios.post("http://localhost:3000/upload", data);
        await axios.post("http://localhost:3000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(
        "http://localhost:3000/api/users/" + user._id,
        updatedUser
      );
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Success Update Profile",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "swal2-modal", // Menambahkan class CSS untuk menengahkan SweetAlert
        },
      });
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit} method="post">
            <label>Profile Picture</label>
            <div className="settingsPP">
              {user.profilePic ? (
                <img
                  src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                  alt=""
                />
              ) : (
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXDPEf_Wmxg6KQoeB-zNeXsclz4tiOcotm3wfc0BugGR1ZK5xJb89wzZ9_wPX6CRxYO4&usqp=CAU"
                  }
                  alt=""
                />
              )}

              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Safak"
              value={username}
              required
              name="name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="safak@gmail.com"
              required
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
