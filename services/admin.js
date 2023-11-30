const Task = require("../models/Task");

/**
 * Create a new task
 * @param {*} req Get the payload from request
 * @param {*} res Return the response to the user
 * @returns newly created task object
 */
exports.addTask = async (req, res) => {
  const { title, description, assigned_to, status } = req.body;
  if (!title || !description || !assigned_to || !status)
    return res.status(400).send("Please fill in all the required fields!");
  try {
    const taskObj = req.body;
    await new Task(taskObj).save();
    return res
      .status(201)
      .json({ message: "Tasks added successfully...", taskObj });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/**
 * Get all the tasks from the database
 * @param {*} req Request from the server
 * @param {*} res Response to the user
 * @returns Display all available tasks in the database
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/**
 * Get the specific task with task Id
 * @param {*} req Request from the server
 * @param {*} res Response to the user
 * @returns Return the specific task
 */
exports.getAllTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    let task = await Task.findById(id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/**
 * Update the specific task
 * @param {*} req Request from the server
 * @param {*} res Response to the user
 * @returns return the updated task to the user
 */
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const opt = { new: true };
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, opt);
    res.status(200).json({
      message: "Task is updated in the list...",
      updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

/**
 * Delete the specific task in the Database
 * @param {*} req Request from the server
 * @param {*} res Response to the user
 * @returns Give status acknowledgement to the user that specific task is deleted
 */
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    return res.status(200).send("Task is deleted in the list");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
