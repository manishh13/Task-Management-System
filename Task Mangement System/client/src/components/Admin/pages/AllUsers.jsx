import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [user, setUser] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();

  const toggleClass = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/deleteuser/${taskId}`);
      toast.success("User  deleted successfully");
      toggleClass();
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  if (isAdmin) {
    return (
      <>
        <div
          className="alltaskdiv"
          style={{
            background: "#9AD0C2",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
              border: "2px solid #ddd",
            }}
            // style={{
            //   width: "100%",
            //   borderCollapse: "collapse",
            //   borderRadius: "10px",
            //   overflow: "hidden",
            //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            // }}
          >
            <thead>
              <tr>
                <th style={{ padding: "10px" }}>S.No</th>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Title</th>
                <th style={{ padding: "10px" }}>Email</th>
                <th style={{ padding: "10px" }}>Admin</th>
                <th style={{ padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td
                      data-column="S.No"
                      style={{ padding: "10px", border: "1px solid #ddd" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      data-column="Name"
                      style={{ padding: "10px", border: "1px solid #ddd" }}
                    >
                      {user.name}
                    </td>
                    <td
                      data-column="Title"
                      style={{ padding: "10px", border: "1px solid #ddd" }}
                    >
                      {user.title}
                    </td>
                    <td
                      data-column="Email"
                      style={{ padding: "10px", border: "1px solid #ddd" }}
                    >
                      {user.email}
                    </td>
                    <td
                      data-column="Admin"
                      style={{ padding: "10px", border: "1px solid #ddd" }}
                    >
                      {user.isAdmin.toString()}
                    </td>
                    <td
                      data-column="Action"
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <MdDelete
                        style={{ color: "red", fontSize: "25px" }}
                        onClick={() => {
                          setTaskid(user._id);
                          toggleClass();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className={isActive ? "confirmation-box" : "confirmation-box-hide"}
          >
            <h2>Confirm Please</h2>
            <hr size="1" color="brown" />
            <p>Do you Really want to Delete this User ? </p>

            <div className="confirmation-box-buttons">
              <button style={{ backgroundColor: "green" }} onClick={deleteUser}>
                Yes
              </button>
              <button style={{ backgroundColor: "red" }} onClick={toggleClass}>
                No
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    Navigate("/");
  }
};

export default AllUsers;
