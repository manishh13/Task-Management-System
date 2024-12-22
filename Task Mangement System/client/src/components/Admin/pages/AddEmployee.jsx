import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({});
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/user/register", input)
        .then((response) => {
          toast.success(response.data.message);
        })
        .then(() => {
          setInput({});
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  if (isAdmin) {
    return (
      <div
        style={{
          background: "#9AD0C2",
          minHeight: "100vh",
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section
          style={{
            backgroundColor: "#ECF4D6",
            marginTop: "0",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(78, 65, 65, 0.1)",
            padding: "20px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#2D9596" }}>
            Add Employee
          </h3>
          <form
            className="form"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#2D9596",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="50"
                value={input.name}
                placeholder="Enter name"
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#2D9596",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Enter email"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#2D9596",
                }}
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
                placeholder="Enter title"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#2D9596",
                }}
              >
                Make Admin?
              </label>
              <select
                name="isAdmin"
                id="isAdmin"
                value={input.isAdmin}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value={false}>No</option>
                <option value={true}> Yes</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px", position: "relative" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#2D9596",
                }}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                placeholder="Enter your password"
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
              {showPassword ? (
                <AiFillEye
                  className="show_password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    color: "#2D9596",
                  }}
                />
              ) : (
                <AiFillEyeInvisible
                  className="show_password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    color: "#2D9596",
                  }}
                />
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className="btn"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#2D9596",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#9AD0C2")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2D9596")
                }
              >
                Create User
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  } else {
    Navigate("/");
  }
};

export default AddEmployee;
