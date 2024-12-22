import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const AllTasks = () => {
  const [task, setTask] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.isAdmin);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const getTask = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task/gettask");
      console.log(res.data);
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const deleteTask = async () => {
    console.log("deleteTask", taskId);
    try {
      await axios.delete(`http://localhost:5000/api/task/deletetask/${taskId}`);
      toggleClass(); // Close the confirmation dialog
      getTask(); // Refresh the task list
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (id) => {
    setTaskid(id); // Set the task ID to be deleted
    toggleClass(); // Show the confirmation dialog
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Pending":
        return "orange";
      case "InProgress":
        return "red";
      default:
        return "black";
    }
  };

  const filterAndSortTasks = (tasks) => {
    const currentDate = new Date();

    // Separate tasks into completed and not completed
    const notCompletedTasks = tasks.filter((task) => {
      const dueDate = new Date(task.enddate);
      return (
        (task.status === "Pending" || task.status === "InProgress") &&
        dueDate >= currentDate
      );
    });

    const completedTasks = tasks.filter((task) => task.status === "Completed");

    // Sort not completed tasks by due date
    const sortedNotCompletedTasks = notCompletedTasks.sort(
      (a, b) => new Date(a.enddate) - new Date(b.enddate)
    );

    // Return concatenated array: not completed tasks first, then completed tasks
    return [...sortedNotCompletedTasks, ...completedTasks];
  };

  const filteredTasks = filterAndSortTasks(task); // Get filtered and sorted tasks
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
          >
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                  S.No
                </th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                  Task Title
                </th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                  Due Date
                </th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                  Status
                </th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((key, index) => {
                return (
                  <tr
                    key={key._id}
                    style={{
                      borderBottom: "1px solid #ddd",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                      data-column="S.No"
                    >
                      {indexOfFirstTask + index + 1}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                      data-column="Task Title"
                    >
                      {key.title}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                      data-column="Due Date"
                    >
                      {key.enddate}
                    </td>
                    <td
                      data-column="Status"
                      style={{
                        color: getStatusColor(key.status),
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <button
                        style={{
                          border: "none",
                          backgroundColor: getStatusColor(key.status),
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "20px",
                          fontWeight: "700",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                      >
                        {key.status}
                      </button>
                    </td>
                    <td
                      data-column="Action"
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <MdDelete
                        style={{ color: "red", cursor: "pointer" }}
                        fontSize="25px"
                        onClick={() => handleDeleteClick(key._id)} // Ensure correct task ID is used
                      />
                      <CiEdit
                        style={{
                          color: "blue",
                          fontSize: "25px",
                          marginLeft: "30px",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                        onClick={() => {
                          navigate("/admin/updatetask/" + key._id);
                        }}
                      />
                      <FaEye
                        style={{
                          color: "green",
                          fontSize: "25px",
                          marginLeft: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/admin/taskdetail/" + key._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className="pagination"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor: currentPage === 1 ? "lightgray" : "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  backgroundColor:
                    currentPage === index + 1 ? "blue" : "lightgray",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor:
                  currentPage === totalPages ? "lightgray" : "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>

          <div
            className={isActive ? "confirmation-box" : "confirmation-box-hide"}
          >
            <h2>Confirm Please</h2>
            <hr size="1" color="brown" />
            <p>Do you Really want to Delete this task?</p>

            <div className="confirmation-box-buttons">
              <button
                style={{ backgroundColor: "green" }}
                onClick={() => deleteTask()}
              >
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
    navigate("/");
  }
};

export default AllTasks;
