const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Task = require("../models/Task");

// Add tasks in DB
exports.addTask = async (req, res) => {
  const { title, description, assigned_to, status } = req.body;
  if (!title || !description || !assigned_to || !status)
    return res.status(400).send("Please fill in all the required fields!");
  try {
    const taskObj = req.body;
    await new Task(taskObj).save();
    return res.status(201).json({message:"Tasks added successfully...",taskObj});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


// Get all tasks
exports.getAllTasks = async (req,res) =>{
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// Get specific task
exports.getAllTaskById = async (req,res) =>{
  try {
    const id = req.params.id;
    let task = await Task.findById(id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}




// Update tasks in DB
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const opt = {new:true};
    const updatedTask = await Task.findByIdAndUpdate(id,req.body,opt);
    res.status(200).json({
      message  : "Task is updated in the list..." , updatedTask
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:error});
  }
};

// DeleteTask in DB
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    return res.status(200).send("Task is deleted in the list");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username }).lean();
    if (!admin) return res.status(404).send("Invalid credentials");
    if (admin.role !== "admin")
      return res.status(404).send("Invalid credentials...");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials...");
    const token = sign({ admin }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await User.deleteOne({ id });
    return res.status(200).send("User has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req?.admin?._id)
      .select("-password")
      .lean();
    if (!admin)
      return res.status(400).send("Admin not found, Authorization denied..");
    return res.status(200).json({ ...admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
