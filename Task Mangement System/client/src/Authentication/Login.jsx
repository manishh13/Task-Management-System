import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setLoginStatus,
  setAdminStatus,
  setUserDetails,
} from "../actions/actions";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = file;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFile({ ...file, loading: true });

    if (!email || !password) {
      setFile({ ...file, loading: false, error: "All fields are required" });
      toast.warning("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success === false) {
      setFile({
        ...file,
        error: data.message,
        loading: false,
      });
      toast.error(data.message);
      return;
    }
    setFile({
      username: "",
      email: "",
      password: "",
      error: null,
      loading: false,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.user));
    toast.success("Logging successful");

    if (data.user.isAdmin === true) {
      navigate("/admin");
      dispatch(setAdminStatus(true));
      dispatch(setLoginStatus(true));
      dispatch(setUserDetails(data.user));
    } else {
      navigate("/user");
      dispatch(setAdminStatus(false));
      dispatch(setLoginStatus(true));
      dispatch(setUserDetails(data.user));
    }
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#9AD0C2", // Gradient background
      }}
    >
      <section
        style={{
          background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "300px", // Set a fixed width for the form
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333" }}>Log in</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#333" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#333" }}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                paddingRight: "40px", // Add padding to the right for the icon
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6a11cb")} // Change border color on focus
              onBlur={(e) => (e.target.style.borderColor = "#ccc")} // Reset border color on blur
            />
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "75%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "black",
              }}
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {error}
            </p>
          )}
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "#2D9596", // Button color
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s",
              }}
              disabled={loading}
              onClick={handleSubmit}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#9AD0C2")
              } // Change button color on hover
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2D9596")
              } // Reset button color
            >
              {loading ? "Logging in ..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
