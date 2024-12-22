import task from "../models/taskModel.js";
import employee from "../models/userModel.js";

export const setTask = async (req, res) => {
  try {
    let data = await new task(req.body);
    data.save().then(async (resp) => {
      let data = await employee.findOneAndUpdate(resp.assign, {
        $push: { tasks: resp._id },
      });
      console.log(resp);
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    let data = await task.findByIdAndUpdate(req.params.id, req.body);
    data.save().then((resp) => {
      res.json(resp);
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const deleteTask = async (req, res) => {
  try {
    let data = await task.findOneAndDelete(req.params.id);
    let employee_id = data.assign;
    console.log(data);
    if (data.assign != null) {
      let employeeData = await employee.findOneAndUpdate(
        { _id: data.assign },
        { $pull: { tasks: data._id } },
        { new: true }
      );
      employeeData.save().then((resp) => {});
    }
    res.json(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const getTask = async (req, res) => {
  try {
    let data = await task.find();
    res.json(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const getEmployeeTask = async (req, res) => {
  try {
    let emp_id = req.params.id;
    console.log("works  " + emp_id);
    let data = await task.find();
    data = data.filter((key) => {
      return emp_id == key.assign;
    });
    res.json(data);
    console.log(data);
  } catch {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};
