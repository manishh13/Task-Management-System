import "./User.css";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  setAdminStatus,
  setLoginStatus,
  setUserDetails,
} from "../../actions/actions";

import axios from "axios";
const User = () => {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLogin = useSelector((state) => state.isLogin);
  const Navigate = useNavigate();
  console.log(isAdmin);
  console.log(isLogin);

  const toggleClass = () => {
    setIsActive(!isActive); // Toggle the state
  };
  const Logout = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("userInfo");
    toast.success("Logout  successful");
    dispatch(setAdminStatus(false));
    dispatch(setLoginStatus(false));
    dispatch(setUserDetails(null));
    navigate("/");
  };
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));

  const gettasks = () => {
    try {
      axios
        .get(`http://localhost:5000/api/task/getemployeetask/${userDetail._id}`)
        .then((response) => {
          setTask(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
       await axios.put(
        `http://localhost:5000/api/task/updatetask/${taskId}`,
        {
          status: updatedStatus,
        }
      );
      toast.success("task updated successfully");
      toggleClass();
      gettasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    gettasks();
  }, []);

  

  if (!isAdmin && isLogin) {
    return (
      <>
        <div className="alltaskdiv">
          <div className="user-container-main">
            <div className="user">
              <div className="user-nav">
                <h1>User</h1>
                <p>
                  <IoIosLogOut className="logout-button" onClick={Logout} />
                </p>
              </div>

              <div className="user-task">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Task Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.map((key, index) => {
                      return (
                        <tr>
                          <td data-column="S.No">{index + 1}</td>
                          <td data-column="Task Title">{key.title}</td>
                          <td data-column="Description">{key.description}</td>
                          <td data-column="Priority">{key.priority}</td>

                          <td data-column="Start Date">{key.startdate}</td>

                          <td data-column="End Date">{key.enddate}</td>
                          <td data-column="Status">{key.status}</td>
                          <td
                            data-column="Change Status"
                            onClick={() => {
                              setTaskid(key._id);
                              toggleClass();
                            }}
                          >
                            <MdEditSquare className="update-task" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className={
                isActive ? "confirmation-box" : "confirmation-box-hide"
              }
              style={{ height: "220px" }}
            >
              <h2>Confirm Please</h2>
              <hr size="1" color="brown" />
              <p>Do you Really want to update the status of this task ? </p>

              <div className="input_container">
                <label>Status : </label>
                <br />
                <select
                  name="status"
                  id="isAdmin"
                  value={updatedStatus}
                  onChange={(e) => {
                    setUpdatedStatus(e.target.value);
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="confirmation-box-buttons">
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={updateTaskStatus}
                >
                  Yes
                </button>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={toggleClass}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    Navigate("/");
  }
};

export default User;
