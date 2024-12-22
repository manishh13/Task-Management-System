import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [input, setInput] = useState({});
  const [user, setUser] = useState([]);
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
      await axios.post("http://localhost:5000/api/task/settask", input);
      toast.success("Task Added Successfully");
      setInput({});
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isAdmin) {
    return (
      <div
        style={{
          background: "#9AD0C2",
          minHeight: "100vh",
          padding: "20px",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <section
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ECF4D6",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#2D9596",
            }}
          >
            Add Task
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title for task"
                minLength="1"
                maxLength="50"
                value={input.title || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                value={input.description || ""}
                placeholder="description of the task"
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                Assigned to
              </label>
              <select
                name="assign"
                value={input.assign || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              >
                <option value="">Select User</option>
                {user.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                Priority
              </label>
              <select
                name="priority"
                value={input.priority || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              >
                <option value="Medium ">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                Status
              </label>
              <select
                name="status"
                value={input.status || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                Start Date
              </label>
              <input
                type="date"
                name="startdate"
                value={input.startdate || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2D9596",
                }}
              >
                End Date
              </label>
              <input
                type="date"
                name="enddate"
                value={input.enddate || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
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
                Add Task
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

export default AddTask;
