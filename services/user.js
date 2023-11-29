const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
/**
 * Register a new user in the database
 * @param {*} req Get payload from the server
 * @param {*} res Response to the user
 * @returns Ack
 */
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role)
    return res.status(400).send("Please fill in all the required fields!");
  try {
    const userObj = { username, email, role };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    return res.status(201).send("User registered successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
/**
 * Get login and verify the user is valid
 * @param {*} req Get login payload from the server
 * @param {*} res Response to the user
 * @returns JWT token for a user
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    if (user.role !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
/**
 * Get authorised user.
 * @param {*} req Request from the server
 * @param {*} res Response to the user
 * @returns Return user if the token is valid
 */
exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/**
 * Get all registered users
 * @param {*} req Request from the user
 * @param {*} res Response to the user
 * @returns all registered users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
