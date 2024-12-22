import express from "express";
import * as taskroutes from "../controllers/taskController.js";

const router = express.Router();

router.post("/settask", taskroutes.setTask);
router.put("/updatetask/:id",  taskroutes.updateTask);
router.delete("/deletetask/:id", taskroutes.deleteTask);
router.get("/gettask", taskroutes.getTask);
router.get("/getemployeetask/:id", taskroutes.getEmployeeTask);
export default router;
