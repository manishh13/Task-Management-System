import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const [input, setInput] = useState([]);
  const [user, setUser] = useState({});
  const { _id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/getusername/${input.assign}`
      );
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getUser();
  }, [input]);

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
          <h3 style={{ color: "#2D9596" }}>Task Details</h3>
          <form
            className="form"
            style={{
              backgroundColor: "#ECF4D6", // Change this to your desired background color
              borderRadius: "8px", // Optional: Add rounded corners
              padding: "0", // Optional: Add padding inside the form
              // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for depth
            }}
          >
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Task Title </label>
              <input
                type="text"
                name="title"
                minLength="1"
                maxLength="50"
                value={input.title}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>

            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Assigned to </label>
              <input
                type="text"
                name=""
                value={user.name}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Priority Type</label>
              <input
                type="text"
                name="description"
                value={input.priority}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Status</label>
              <input
                type="text"
                name="description"
                value={input.status}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label style={{ color: "#2D9596" }}>Start date</label>
              <input
                type="text"
                name="description"
                value={input.startdate}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>

            <div className="input_container">
              <label style={{ color: "#2D9596" }}>End Date</label>
              <input
                type="text"
                name="description"
                value={input.enddate}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
          </form>
        </section>
      </div>
    );
  } else {
    Navigate("/");
  }
};

export default TaskDetail;
