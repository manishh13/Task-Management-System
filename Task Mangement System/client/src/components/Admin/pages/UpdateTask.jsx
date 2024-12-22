import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UpdateTask = () => {
  const [input, setInput] = useState([]);
  const [user, setUser] = useState([]);
  const { _id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/task/updatetask/${_id}`, input)
      .then((res) => {
        console.log(res.data);
        toast.success("Task Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const getData = () => {
    try {
      axios
        .get(`http://localhost:5000/api/task/gettask/?_id=${_id}`)
        .then((res) => {
          setInput(res.data[0]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(input);
  if (isAdmin) {
    return (
      <div
        className="background_container"
        style={{
          background: "#9AD0C2",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <section
          className="add-employee-section"
          style={{ backgroundColor: "#ECF4D6", padding: "20px" }}
        >
          <h3 style={{ color: "#2D9596" }}>Update Task</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Task Title </label>
              <input
                type="text"
                name="title"
                minLength="1"
                maxLength="50"
                value={input.title}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Priority</label>
              <br />
              <select
                name="priority"
                id="isAdmin"
                value={input.priority}
                onChange={handleChange}
              >
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Status</label>
              <br />
              <select
                name="status"
                id="isAdmin"
                value={input.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Start date</label>
              <input
                type="date"
                name="startdate"
                value={input.startdate}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label style={{ color: "#2D9596" }}>End Date</label>
              <input
                type="date"
                name="enddate"
                value={input.enddate}
                onChange={handleChange}
              />
            </div>

            {/* {error && <p className="error">{error}</p>} */}
            <div className="btn_container">
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
                {/* {loading ? "Creating ..." : "Register"} */}
                Update Task
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

export default UpdateTask;
